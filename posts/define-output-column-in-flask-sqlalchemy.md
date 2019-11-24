---
title: "Define output column in Flask-SqlAlchemy"
author: "Sporule"
date: "2019-11-24"
categories: "code"
tags: "flask,python,sqlalchemy,flask-sqlalchemy"
coverImage:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRilFX9Kg2VGgC02Fy6ILT5PKamAfygZnD6XsqahK4zwHY80M9f2w&s"
---

## The background

I am writing a Web API in python for a general purpose CMS by using Flask + Flask - SqlAlchemy. It is very easy to use but it does not provide a native way to declare what should be the output colums. This function is very useful as I don't want to pass everything to the client.

## What we want to achieve

We want to be able to output selected columns from a SQLAlchemy object as dictionary, the reason we are outputing it as dictionary is because Flask can't jsonify the SQLAlchemy Object directly.

## Implementation

In Golang with MongoDB, it can set `json:"-"` to columns to omit columns that you don't want to output. In below example, the Password and TokenSalt will be omitted if we run a json export.

```go
type User struct {
    ID               bson.ObjectId          `bson:"_id,omitempty" json:"_id,omitempty"`
    Email            string                 `bson:"email,omitempty" json:"email,omitempty"`
	Password         string                 `bson:"password,omitempty" json:"-"`
	TokenSalt        string                 `bson:"tokenSalt,omitempty" json:"-"`
	CreatedDate      time.Time              `bson:"createdDate,omitempty" json:"createdDate,omitempty"`
	ModifiedDate     time.Time              `bson:"modeifiedDate,omitempty" json:"modeifiedDate,omitempty"`
}
```

I am trying to follow the same method in python but I don't know how to declare extra properties in the column, so I used a very simple way to do that by adding a property call output_column in python.

For example we have a User and Role class with Mixin class, please check SQLAlchemy documentation first if you are not familiar with it.

> The old code:

```python

class DBMixin():
    id = db.Column(db.Integer, primary_key=True)
    created_time = db.Column(db.DateTime, server_default=db.func.now())
    modified_time = db.Column(
        db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()


class User(db.Model,DBMixin):
    __tablename__ = 'user'
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    role_id = db.Column(db.Integer, db.ForeignKey('role.id'),default = 1)
    articles = db.relationship('Article', backref='user', lazy='dynamic')
    orders = db.relationship('Order', backref='user', lazy='dynamic')

class Role(db.Model,DBMixin):
    __tablename__ = 'role'
    name = db.Column(db.String(50), unique=True, nullable=False)
    users = db.relationship('User', backref='role', lazy='dynamic')

    def __init__(self, name):
        self.name = name

```

> The new code with output as dict:

```python

class DBMixin():
    id = db.Column(db.Integer, primary_key=True)
    created_time = db.Column(db.DateTime, server_default=db.func.now())
    modified_time = db.Column(
        db.DateTime, server_default=db.func.now(), onupdate=db.func.now())
    output_column = [] # Added output_column

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def as_dict(self, output_column=[]):
        """
        Added as_dict function
        """
        output = {}
        # Use default self.output_column if output_column is empty
        output_column = output_column if len(
            output_column) > 0 else self.output_column
        # Use all columns if self.output_column is empty
        output_column = output_column if len(output_column) > 0 else [
            c.name for c in self.__table__.columns]
        for column in output_column:
            column_list = column.split('.')
            if len(column_list) > 1:
                value  = self
                for x in range(0,len(column_list)):
                    # This is for to cope with the different level. For example I can output the role of the user by passing "role.name", it can be multiple level
                    if hasattr(value,column_list[x]):
                        value = getattr(value,column_list[x])
                    else:
                        value = ''
                        break
                output[column] = str(value)
                continue
            # Simple output if the column is in the class itself
            output[column] = str(getattr(self, column))
        return output

class User(db.Model,DBMixin):
    __tablename__ = 'user'
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    role_id = db.Column(db.Integer, db.ForeignKey('role.id'),default = 1)
    articles = db.relationship('Article', backref='user', lazy='dynamic')
    orders = db.relationship('Order', backref='user', lazy='dynamic')
    output_columns = ['email','role.name']

class Role(db.Model,DBMixin):
    __tablename__ = 'role'
    name = db.Column(db.String(50), unique=True, nullable=False)
    users = db.relationship('User', backref='role', lazy='dynamic')

    def __init__(self, name):
        self.name = name

```

As you can see above, I have added an attribute `output_columns`.  This is to define the default output_columns. This can be overrided in the individual class, I have done that for User class.

I have also added a function `as_dict`. It accepts on variable `output_columns` in case if different function want to override the default one. So the priority of the `output_columns` is:

> `passed in to function` > `declared in the class` > `declared in the mixin class` > `all columns in the class`

It also supports multilevel output, for example we want to export both email address and the name of the User Role. What we need to do is simple put `'role.name'` inside the output_columns. I have added the specific `output_columns` in User class above, and below is the expected output after running the as_dict():


```python
[
  {
    "email": "abc@gmail.com", 
    "role.name": "member"
  }, 
  {
    "email": "abcd@gmail.com", 
    "role.name": "admin"
  }
]

```