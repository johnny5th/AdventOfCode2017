defmodule Advent do
  def one(input) do
    String.split(input, "\n")
      |> Enum.map(&String.split(&1, " "))
      |> Enum.filter(fn(words) ->
        length(Enum.uniq(words)) === length(words)
      end)
      |> length
  end

  def two(input) do
    String.split(input, "\n")
    |> Enum.map(&String.split(&1, " "))
    |> Enum.filter(fn(words) ->
      length(Enum.uniq_by(words, fn(letters) -> Enum.sort(to_charlist(letters)) end)) === length(words)
    end)
    |> length
  end
end
