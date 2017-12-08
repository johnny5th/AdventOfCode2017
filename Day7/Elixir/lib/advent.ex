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
        skip(char("(")), integer(), skip(char(")")),
        skip(space()),
        skip(string("-> ")),
        option(sep_by1(word(), string(", ")))
      ])
    )

    tower = Enum.at(result, 0)
    weight = Enum.at(result, 1)
    children = Enum.at(result, 2)

    %{tower: tower, weight: weight, children: (if (children), do: children, else: [])}
  end

  def one(input) do
    towers = parse(input)

    Enum.reduce(towers, Enum.map(towers, &Map.fetch!(&1, :tower)), fn(tower, towers) ->
      case Enum.empty?(tower.children) do
        true ->
          towers
        false ->
          # here we remove towers that are children from the "running" for bottom tower
          Enum.reduce(tower.children, towers, fn(child, nextTowers) ->
            List.delete(nextTowers, child)
          end)
      end
    end) |> List.first
  end

  def two(input) do
    towers = parse(input)

    fleshOutTower(towers, Enum.find(towers, fn(t) -> t.tower === one(input) end))
  end

  def fleshOutTower(towers, tower) do
    children = Enum.map(tower.children, fn(child) ->
      foundChild = Enum.find(towers, fn(t) -> t.tower === child end)

      fleshedChild = fleshOutTower(towers, foundChild)

      Map.put(
        fleshedChild,
        :diskWeight,
        Map.get(fleshedChild, :diskWeight, fleshedChild.weight) + Enum.reduce(
          fleshedChild.children,
          0,
          fn(c, total) ->
            Map.get(c, :diskWeight, c.weight) + total
          end
        ))
    end)

    checkForIncorrectTower(children)

    Map.put(tower, :children, children)
  end

  def checkForIncorrectTower(children) do
    diskWeights = Enum.map(children, &Map.get(&1, :diskWeight))

    case length(diskWeights) > 1 && length(Enum.uniq(diskWeights)) === 2 do
      true ->
        wrongWeight = Enum.filter(diskWeights, fn(diskWeight) ->
          length(Enum.uniq(diskWeights -- [diskWeight])) === 1
        end) |> List.first

        wrongChild = Enum.filter(children, fn(child) ->
          child.diskWeight === wrongWeight
        end) |> List.first

        IO.inspect(wrongChild, charlists: :as_lists)

        [rightDiskWeight | _] = diskWeights -- [wrongChild.diskWeight]

        updatedChildWeight = wrongChild.weight + (rightDiskWeight - wrongChild.diskWeight)

        IO.puts("Tower \"#{wrongChild.tower}\" weight should be changed to: #{updatedChildWeight}")

        Kernel.exit(1)
      false -> nil
    end
  end
end
