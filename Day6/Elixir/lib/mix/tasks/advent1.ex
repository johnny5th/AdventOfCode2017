defmodule Mix.Tasks.Advent1.Run do
  use Mix.Task

  def run(_) do
    Advent.one([2,8,8,5,4,2,3,1,5,5,1,2,15,13,5,14]).cycleCount |> IO.inspect(charlists: :as_lists)
  end
end