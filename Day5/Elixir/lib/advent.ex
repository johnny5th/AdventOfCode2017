defmodule Advent do
  def one(input) do
    maze = {
      0,
      String.split(input, "\n") |> Enum.map(&String.to_integer/1)
    }

    move(maze)
  end

  def move({location, maze}, jumps \\ 0) do
    numberAtLocation = Enum.at(maze, location)

    case numberAtLocation do
      nil ->
        jumps
      _ ->
        nextMaze = List.update_at(maze, location, &(&1 + 1))

        move({location + numberAtLocation, nextMaze}, jumps + 1)
    end
  end

  def two(input) do
    maze = {
      0,
      String.split(input, "\n") |> Enum.map(&String.to_integer/1)
    }

    move2(maze)
  end

  def move2({location, maze}, jumps \\ 0) do
    numberAtLocation = Enum.at(maze, location)

    case numberAtLocation do
      nil ->
        jumps
      _ ->
        nextMaze = List.update_at(maze, location, fn(offset) ->
          case offset >= 3 do
            true -> offset - 1
            false -> offset + 1
          end
        end)

        move2({location + numberAtLocation, nextMaze}, jumps + 1)
    end
  end
end
