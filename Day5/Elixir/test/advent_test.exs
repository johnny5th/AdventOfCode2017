defmodule AdventTest do
  use ExUnit.Case
  doctest Advent

  # 1
  test "one can pass the example" do
    assert Advent.one("0\n3\n0\n1\n-3") === 5
  end

  # 2
  test "two can pass the example" do
    assert Advent.two("0\n3\n0\n1\n-3") === 10
  end
end
