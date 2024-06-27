# DOCS

- [Words]
    - [Get requests]
    - [Post request]
    - [Put request]
    - [Delete request]
- [Examples]
    - [Get requests (examples)] 
    - [Post request (examples)]
    - [Put request (examples)]
    - [Delete request (examples)]


[Words]: #words
[Get requests]: #get-requests
[Post request]: #post-request-create
[Put request]: #put-request-edit
[Delete request]: #delete-request-remove
[Examples]: #examples
[Get requests (examples)]: #get-requests-1
[Post request (examples)]: #post-request-create-1
[Put request (examples)]: #put-request-edit-1
[Delete request (examples)]: #delete-request-remove-1

<br><br>

# WORDS

## Conventions
- #### Roles
>        1. Noun
>        2. Verb
>        3. Number
>        4. Conjuction
>        5. Preposition
>        6. Adverb
>        7. Auxiliary
>        8. Adjective
>        9. Pronoun
>        10. Interjection
>        11. Other
- #### English translations
>        All translations should be separated by a comma followed by a space (example, dog, translation)
- #### Requests
>       the title of the request cannot contain spaces: by convention the underscores are used
<br>

___

## Get requests
- Get all words in alphabetical order (only names)
    >GET - `/api/word/all`
    - returns
        ```json
        "wordsList": [
            "Name 1",
            "Name 2",
            "Name 3",
        ],
        "wordsCount": 3
        ```
<br>

- Gets an array of words relative to the array of given names
    >GET - `/api/word`
    - body:
        ```json
        "list": [
            "Name 1",
            "Name 2"
        ]
        ```
    - returns:
        ```json
        "wordsList": [
            {
                "name": "Name 1",
                "role": 1,
                "english": "translation",
                "ethimology": "original/origin...",
                "description": "This is the name's description...",
                "synonyms": ""
            },
            {
                "name": "Name 2",
                "role": 2,
                "english": "translation",
                "ethimology": "original/origin...",
                "description": "This is the name's description...",
                "synonyms": ""
            }
        ]
        ```
<br>

- Gets all the silamena words given an english one (only names)
    >GET - `/api/word/` `{english-word}`
    - returns
        ```json
        "wordsList": [
            "Option 1",
            "Option 2",
            "Option 3",
        ]
        ```
<br>

- Finds if an english word has a silamena translation
    >GET - `/api/word/exists` `{english-word}`
    - returns
        ```json
        "exists": false
        ```
<br>

___

## Post request (create)
- Create a word
    >POST - `/api/word`
    #### Body:
    ```json
    "name": "name (string)",
    "role": "categorization (number)",
    "english": "english-translations (string)",
    "ethimology": "ethimology (string)",
    "description": "description/explaination (string)",
    "synonyms": "possible synonyms of the word (string)"
    ```

<br>

___

## Put request (edit)
- Edit a word
    >PUT - `/api/word/` `{name}`
    #### Body:
    ```json
    "name": "new-name",
    "role": "new-role",
    "english": "new-translation",
    "ethimology": "new-ethimology",
    "description": "new-description",
    "synonyms": "new-synonyms"
    ```

<br>

___

## Delete request (remove)
- Delete a word
    >DELETE - `/api/word/` `{name}`
___

<br>

# EXAMPLES

## Get requests
- Get a _num_ of random examples (**num is by default 1**)
    >GET - `/api/example/random` `{?num=num}`

    - returns
        ```json
        "examplesList": [
            {
                "id": 1,
                "silamena": "Random text",
                "english": "English translation"
            }
        ]
        ```

<br>

- Get a _num_ of examples given an english expression (**num is by default 3**)
    >GET - `/api/example/` `{expression}` `[?num=num]`

    - returns
        ```json
        "examplesList": [
            {
                "id": 1,
                "silamena": "Example 1",
                "english": "Example 1 in english"
            },
            {
                "id": 2,
                "silamena": "Example 2",
                "english": "Example 2 in english"
            },
            {
                "id": 3,
                "silamena": "Example 3",
                "english": "Example 3 in english"
            },
        ]
        ```

## Post request (create)
- Create an example
    >POST - `/api/example`
    #### Body:
    ```json
    "silamena": "silamena example (string)",
    "english": "enslish translation (number)"
    ```

<br>

___

## Put request (edit)
- Edit an example
    >PUT - `/api/example/` `{id}`
    #### Body:
    ```json
    "silamena": "new-silamena-example",
    "english": "new-english-translation"
    ```

<br>

___

## Delete request (remove)
- Delete an example
    >DELETE - `/api/example/` `{id}`
___
