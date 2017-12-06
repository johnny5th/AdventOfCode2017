defmodule Advent do
  def one(input) do
    String.split(input, "\n")
      |> Enum.map(&String.split(&1, "\t"))
      |> Enum.map(fn(strings) -> Enum.map(strings, &String.to_integer/1) end)
      |> Enum.map(&checkDiff/1)
      |> Enum.sum
  end

  def two(input) do
    String.split(input, "\n")
    |> Enum.map(&String.split(&1, "\t"))
    |> Enum.map(fn(strings) -> Enum.map(strings, &String.to_integer/1) end)
    |> Enum.map(&checkDiffDivisor/1)
    |> Enum.sum
  end

  def checkDiff(numbers) do
    Enum.max(numbers) - Enum.min(numbers)
  end

  def checkDiffDivisor([head | tail]) do
    result = Enum.reduce(tail, head, fn(next, prev) ->
      if (is_tuple(prev)) do
        # Short Circuit.
        prev
      else
        max = Enum.max([prev, next])
        min = Enum.min([prev, next])

        case (max / min) / div(max, min) == 1 do
          true ->
            {div(max, min), :nil}
          false ->
            prev
        end
      end
    end)

    case is_tuple(result) do
      true -> elem(result, 0)
      false ->
        checkDiffDivisor(Enum.uniq(tail ++ [head]))
    end
  end
end
