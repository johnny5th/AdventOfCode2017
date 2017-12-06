defmodule AdventTest do
  use ExUnit.Case
  doctest Advent

  # 1
  test "one can pass the example" do
    assert Advent.one([0, 2, 7, 0]).cycleCount === 5
  end

  # 2
  test "two can pass the example" do
    assert Advent.one([0, 2, 7, 0]).loopSize === 4
  end
end
