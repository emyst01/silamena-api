# DOCS

<br>

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
        //    .
        //    .
        //    .
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
        //    .
        //    .
        //    .
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
        //    .
        //    .
        //    .
        ]
        ```
<br>

- Gets all the silamena words given an english one (only names)
    >GET - `/api/word/` `{english-name}`
    - returns
        ```json
        "wordsList": [
            "Option 1",
            "Option 2",
            "Option 3",
        //    .
        //    .
        //    .
        ]
        ```

<br>

___

## Post request (create)
- Create a word
    >POST - `/api/word`
    #### Body:
    ```json
    "name": name (string),
    "role": categorization (number),
    "english": english-translations (string),
    "ethimology": ethimology (string),
    "description": description/explaination (string),
    "synonyms": possible synonyms of the word (string)
    ```

<br>

___

## Put request (edit)
- Edit a word
    >PUT - `/api/word/` `{name}`
    #### Body:
    ```json
    "name": new-name,
    "role": new-role,
    "english": new-translation,
    "ethimology": new-ethimology,
    "description": new-description
    "synonyms": new-synonyms
    ```

<br>

___

## Delete request (remove)
- Delete a word
    >DELETE - `/api/word/` `{name}`
___
