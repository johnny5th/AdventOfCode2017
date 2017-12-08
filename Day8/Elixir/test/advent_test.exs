defmodule AdventTest do
  use ExUnit.Case
  doctest Advent

  # 1
  test "can parse" do
    assert Advent.one("b inc 5 if a > 1\na inc 1 if b < 5\nc dec -10 if a >= 1\nc inc -20 if c == 10") === 1
  end

  # 2
  test "two can pass the example" do
    assert Advent.two("b inc 5 if a > 1\na inc 1 if b < 5\nc dec -10 if a >= 1\nc inc -20 if c == 10") === 10
  end
end
