defmodule Advent do
  def one(input) do
    split = String.split(input, "") |> Enum.filter(fn(x) -> x !== "" end)

    [last | reversedStartWithoutLast] = Enum.reverse(split)

    startWithoutLast = Enum.reverse(reversedStartWithoutLast)

    Enum.zip(split, [last | startWithoutLast])
      |> Enum.filter(fn({a, b}) -> a === b end)
      |> Enum.map(&elem(&1, 1))
      |> Enum.map(&String.to_integer/1)
      |> Enum.sum
  end

  def two(input) do
    split = String.split(input, "") |> Enum.filter(fn(x) -> x !== "" end)

    [firstHalf, secondHalf] = Enum.chunk_every(split, round(length(split) / 2))

    Enum.zip(firstHalf, secondHalf)
    |> Enum.filter(fn({a, b}) -> a === b end)
    |> Enum.map(&elem(&1, 1))
    |> Enum.map(&String.to_integer/1)
    |> Enum.sum
    |> Kernel.*(2)
  end
end
