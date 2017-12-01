defmodule AdventTest do
  use ExUnit.Case
  doctest Advent

  # 1
  test "one can sum the numbers properly" do
    assert Advent.one("1122") === 3
  end

  test "one can do a single consecutive number" do
    assert Advent.one("1111") === 4
  end

  test "one can do match none" do
    assert Advent.one("1234") === 0
  end

  test "one can handle wrapping" do
    assert Advent.one("91212129") === 9
  end

  # 2
  test "two can sum the numbers properly" do
    assert Advent.two("1212") === 6
  end

  test "two can do another example" do
    assert Advent.two("1221") === 0
  end

  test "two can do another another example" do
    assert Advent.two("123425") === 4
  end

  test "two can another another another example" do
    assert Advent.two("123123") === 12
  end

  test "two can another another another another example (yes really)" do
    assert Advent.two("12131415") === 4
  end
end
