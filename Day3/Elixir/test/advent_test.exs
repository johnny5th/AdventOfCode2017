defmodule AdventTest do
  use ExUnit.Case
  doctest Advent

  # 1
  test "one can do first example" do
    assert Advent.one(1) === 0
  end

  test "one can do second example" do
    assert Advent.one(12) === 3
  end

  test "one can do third example" do
    assert Advent.one(23) === 2
  end

  test "one can do fourth example" do
    assert Advent.one(26) === 5
  end

  test "one can do fifth example" do
    assert Advent.one(19) === 2
  end

  # 2
  test "two can get a couple correct numbers based off example" do
    assert Advent.two(24) === 25
    assert Advent.two(362) === 747
  end
end
