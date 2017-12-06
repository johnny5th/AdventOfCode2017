defmodule Mix.Tasks.Advent1.Run do
  use Mix.Task

  def run(_) do
    325489 |> Advent.one |> IO.inspect(charlists: :as_lists)
  end
end