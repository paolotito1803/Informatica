
##  Simple HTTP REST server
 
Post and get simple text messages. Each message has a text content, a list of tags
and an associated timestamp


Endpoints          Attributes          Method        Description

    /                  -                  GET         Returns the version and a list of available endpoints
    /messages          -                  GET         Returns all the posted messages
    /messages          -                  POST        Post a new message
    /messages        ?index=<n>           DELETE      Delete the n^th message


## Install and run

To install the required modules:

```
$ npm install
```

To compile:

```
$ npm run compile
```

or

```
$ npx tsc
```

To run:

```
$ node postmessages
```
