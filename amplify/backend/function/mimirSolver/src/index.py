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
        "body": json.dumps([['∧E', [4], 'SAME FORMAT AS INPUT'], ['→E', [2, 3], 'G'], ... , ['∧E', [4], 'B']]),
    }

    See this link for more information: https://docs.aws.amazon.com/lambda/latest/dg/python-handler.html
    """

    print("received event:")
    print(event)

    arg_premises = event[premises]
    arg_conclusion = event[target]
    arg_state = deque()
    possible_set = set()
    for premise in arg_premises:
        arg_state.append(input_decoder(premise))
    arg_conclusion = Expression(arg_conclusion)
    solution = solve(arg_state, possible_set, arg_conclusion)
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
        "body": json.dumps(solution),
    }


def input_decoder(string_expression):
    expression_list = string_expression.split()
    token_stack = deque()
    i = 0
    while i < len(expression_list):
        if expression_list[i] == ')':
            sentence_2 = token_stack.pop()
            if type(sentence_2) != Expression:
                sentence_2 = Expression(sentence_2)
            bin_connective = str(token_stack.pop())
            sentence_1 = token_stack.pop()
            if type(sentence_1) != Expression:
                sentence_1 = Expression(sentence_1)
            token_stack.pop()
            expression1 = Expression(sentence_1, bin_connective, sentence_2)
            token_stack.append(expression1)
        elif expression_list[i] == '¬':
            nexpression = Expression(expression_list[i+1],Expression(expression_list[i]))
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

    def __repr__(self):
        return str(self)

    def __str__(self):
        if self.connective is None:
            return str(self.sentence_1)
        if self.connective is not None and self.sentence_2 is not None:
            return f'( {self.sentence_1} {self.connective} {self.sentence_2} )'
        if self.connective is not None and self.sentence_2 is None:
            return f'{self.connective} {self.sentence_1}'

    def __eq__(self, other):
        return self.connective == other.connective and self.sentence_1 == other.sentence_1 and self.sentence_2 == other.sentence_2

    def __hash__(self):
        return hash(self.__repr__())


def solve(state, set, target):
    solution_history = []
    while target not in set:
        temp_expression = state.popleft()
        if temp_expression.connective == '∧':
            if temp_expression.sentence_1.sentence_2 is None:
                set.add(temp_expression.sentence_1)
            else:
                state.append(temp_expression.sentence_1)
            solution_history += [['∧E',[str(temp_expression)],str(temp_expression.sentence_1)]]
            if temp_expression.sentence_2.sentence_2 is None:
                set.add(temp_expression.sentence_2)
            else:
                state.append(temp_expression.sentence_2)
            solution_history += [['∧E',[str(temp_expression)],str(temp_expression.sentence_2)]]
        if temp_expression.connective == '→':
            if temp_expression.sentence_1 in set:
                if temp_expression.sentence_2.sentence_2 is None:
                    set.add(temp_expression.sentence_2)
                else:
                    state.append(temp_expression.sentence_2)
                solution_history += [['→E',[str(temp_expression),str(temp_expression.sentence_1)],str(temp_expression.sentence_2)]]
            else:
                state.append(temp_expression)
    return solution_history
