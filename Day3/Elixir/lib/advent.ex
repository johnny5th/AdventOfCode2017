defmodule Advent do
  def one(input) do
        getDistance(1, input)
  end

  def getDistance(start, toNumber) do
    max = round(4 * :math.pow(start, 2) - (4 * start) + 1)

    case toNumber <= max do
      true ->
        sides = [
          max - (start - 1),
          max - 3 * (start - 1),
          max - 5 * (start - 1),
          max - 7 * (start - 1),
        ]

        lowerTravel = Enum.min(Enum.map(sides, fn(side) ->
          abs(side - toNumber)
        end))

        (start - 1) + lowerTravel
      false -> getDistance(start + 1, toNumber)
    end
  end

  def two(max, coordsAndValues \\ [{1, 0, 0}]) do
    {_, lastX, lastY} = List.first(Enum.reverse(coordsAndValues))

    nextCoord = getNextCoord({lastX, lastY})

    nextValue = getNextValue(coordsAndValues, nextCoord)

    nextCoordsAndValues = coordsAndValues ++ [{nextValue, elem(nextCoord, 0), elem(nextCoord, 1)}]

    case nextValue > max do
      true ->
        nextValue
      false ->
        two(max, nextCoordsAndValues)
    end
  end

  def getNextValue(prevCoordsAndValues, {coordX, coordY}) do
    Enum.reduce(prevCoordsAndValues, 0, fn({value, x, y}, sum) ->
      case abs(coordX - x) <= 1 && abs(coordY - y) <= 1 do
        true ->
          sum + value
        false ->
          sum
      end
    end)
  end

  def getNextCoord({lastX, lastY}) do
    sideLength = max(abs(lastX), abs(lastY))

    cond do
      # Start of new sideLength
      lastX === sideLength && lastY === -sideLength -> {sideLength + 1, -sideLength}

      # Right side
      lastX === sideLength && lastY < sideLength -> {sideLength, lastY + 1}

      # Top side
      lastY === sideLength && lastX > -sideLength -> {lastX - 1, lastY}

      # Left side
      lastX === -sideLength && lastY > -sideLength -> {lastX, lastY - 1}

      # Bottom side
      lastY === -sideLength && lastX < sideLength -> {lastX + 1, lastY}
    end
  end
end
