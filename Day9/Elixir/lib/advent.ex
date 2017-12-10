defmodule Advent do
  def one(input) do
      input
        |> dropIgnores
        |> dropIgnores
        |> dropIgnores
        |> dropIgnores
        |> dropIgnores
        |> dropIgnores
        |> dropTrash
        |> getGroupScore
  end

  def getGroupScore(cleaned) do
    cleaned
      |> String.split("")
      |> Enum.reduce({0, 0}, fn(next, {score, depth}) ->
        case next do
          "{" -> {score, depth + 1}
          "," -> {score, depth}
          "}" -> {score + depth, depth - 1}
          "" -> {score, depth}
        end
      end)
      |> elem(0)
  end

  def dropTrash(string) do
    Regex.replace(~r/(<[^>]*[>]{1})/, string, "")
  end

  def countTrash(string) do
    Regex.scan(~r/(<[^>]*[>]{1})/, string)
      |> Enum.map(&List.first/1)
      |> Enum.map(&String.length/1)
      |> Enum.map(&(&1 - 2))
      |> Enum.sum
  end

  def dropIgnores(string) do
    Regex.replace(~r/\!.{1}/, string, "")
  end

  def two(input) do
    input
    |> dropIgnores
    |> dropIgnores
    |> dropIgnores
    |> dropIgnores
    |> dropIgnores
    |> dropIgnores
    |> countTrash
  end
end
