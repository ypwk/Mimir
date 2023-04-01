import json
from collections import deque

def handler(event, context):
    """
    'Server-side' code that handles events. Quis code here. Will call solve at some point

    Arguments:
    event   — An object that contains data for a Lambda function to process. A python dictionary in the following format:
    {
      "premises": list of premises in string format.
      "target": a single string target
    }

    Example:
        ["( A ∨ ( A ∨ B ) ) → A", "A → ( B ∨ C )"]

        expression = ( un_connective expression ) | ( expression bin_connective expression ) | sentence
        sentence = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z" | “?”
        bin_connective = "∨" | "∧" | "→" | "↔"
        un_connective = "¬"

    context — Provides methods and properties that provide information about the invocation, function, and runtime
              environment.

    Return: {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
        "body": json.dumps([[rule, e1, e2, result], [rule, e1, e2, result], ... , [rule, e1, e2, result]]),
    }

    See this link for more information: https://docs.aws.amazon.com/lambda/latest/dg/python-handler.html
    """

    print("received event:")
    print(event)

    # unpack premises

    # call solve

    # https://docs.python.org/3/library/queue.html#queue.Queue


    # process output of solve, put into output format

    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
        "body": json.dumps("Hello from your new Amplify Python lambda!"),
    }

def input_decoder(string_expression):
    string_expression.split()
    for c in string_expression:


class Expression:

    def __init__(self, sentence_1, connective = None, sentence_2 = None):
        self.sentence_1 = sentence_1
        self.connective = connective
        self.sentence_2 = sentence_2

    def __str__(self):
        if self.connective == None:
            return str(self.sentence_1)
        if self.connective != None and self.sentence_2 != None:
            return f'{self.sentence_1} {self.connective} {self.sentence_2}'
        if self.connective != None and self.sentence_2 == None:
            return f'{self.connective} {self.sentence_1}'


# class Expression:

def solve(premises, target):


    while True:
      if target in premises:

    # make decisions based on parsed input (recur)
