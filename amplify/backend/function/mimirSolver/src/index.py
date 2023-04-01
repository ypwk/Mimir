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
        ["( ( A ∨ ( A ∨ B ) ) → A )", "( A → ( B ∨ C ) )"]

        expression = un_connective expression | ( expression bin_connective expression ) | sentence
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

    arg_premises = event[premises]
    arg_conclusion = event[target]
    arg_state = deque()
    for premise in arg_premises:
        arg_state.append(input_decoder(premise))
    while arg_conclusion not in arg_state:
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
    expression_list = string_expression.split()
    token_stack = deque()
    i = 0
    while i < len(expression_list):
        if expression_list[i] == ')':
            sentence_2 = token_stack.pop()
            bin_connective = token_stack.pop()
            sentence_1 = token_stack.pop()
            token_stack.pop()
            expression1 = Expression(sentence_1, bin_connective, sentence_2)
            token_stack.append(expression1)
        elif expression_list[i] == '¬':
            nexpression = Expression(expression_list[i+1],expression_list[i])
            token_stack.append(nexpression)
            i += 1
        else:
            token_stack.append(expression_list[i])
        i += 1
    return token_stack.pop()


class Expression:

    def __init__(self, sentence_1, connective = None, sentence_2 = None):
        self.sentence_1 = sentence_1
        self.connective = connective
        self.sentence_2 = sentence_2

    def __str__(self):
        if self.connective == None:
            return str(self.sentence_1)
        if self.connective != None and self.sentence_2 != None:
            return f'( {self.sentence_1} {self.connective} {self.sentence_2} )'
        if self.connective != None and self.sentence_2 == None:
            return f'{self.connective} {self.sentence_1}'


# class Expression:

def solve(premises, target):


    while True:
      if target in premises:

    # make decisions based on parsed input (recur)

