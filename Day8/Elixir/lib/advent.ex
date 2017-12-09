defmodule Advent do
  use Combine
  import Elixir.Combine.Parsers.Base
  import Combine.Parsers.Text

  def parse(input) do
    String.split(input, "\n")
    |> Enum.map(&parseLine/1)
  end

  def parseLine(line) do
    [result | _] = Combine.parse(
      line,
      sequence([
        word(),
        skip(space()),
        choice([string("dec"), string("inc")]),
        skip(space()),
        word_of(~r/[\-\d]+/),
        skip(string(" if ")),
        word(),
        skip(space()),
        choice([string("<="), string(">="), string(">"), string("<"), string("=="), string("!=")]),
        skip(space()),
        word_of(~r/[\-\d]+/),
      ])
    )

    %{
      register: Enum.at(result, 0),
      add: case Enum.at(result, 1) do
        "inc" -> String.to_integer(Enum.at(result, 2))
        _ -> -String.to_integer(Enum.at(result, 2))
      end,
      registerA: Enum.at(result, 3),
      operator: Enum.at(result, 4),
      valueB: String.to_integer(Enum.at(result, 5)),
    }
  end

  def truthy?(str, a, b) do
    case str do
      "<=" -> a <= b
      ">=" -> a >= b
      ">" -> a > b
      "<" -> a < b
      "==" -> a == b
      "!=" -> a != b
    end
  end

  def eval(program) do
    Enum.reduce(program, {0, %{}}, fn(operation, {max, store}) ->
      nextStore = Map.put_new(store, operation.register, 0)
                  |> Map.put_new(operation.registerA, 0)

      case truthy?(operation.operator, Map.get(nextStore, operation.registerA), operation.valueB) do
        true ->
          nextValue = Map.get(nextStore, operation.register) + operation.add

          {(if (nextValue > max), do: nextValue, else: max), Map.put(nextStore, operation.register, nextValue)}
        false ->
          {max, nextStore}
      end
    end)
  end

  def one(input) do
    input |> parse |> eval |> elem(1) |> Map.values |> Enum.max
  end

  def two(input) do
    input |> parse |> eval |> elem(0)
  end
end
