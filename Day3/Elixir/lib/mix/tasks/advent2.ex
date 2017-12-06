defmodule Mix.Tasks.Advent2.Run do
  use Mix.Task

  def run(_) do
    Advent.two(325489) |> IO.inspect(charlists: :as_lists)
  end
end