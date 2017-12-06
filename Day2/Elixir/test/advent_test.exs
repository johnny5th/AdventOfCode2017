defmodule AdventTest do
  use ExUnit.Case
  doctest Advent

  # 1
  test "one can pass the example" do
    assert Advent.one("5\t1\t9\t5\n7\t5\t3\n2\t4\t6\t8") === 18
  end

  # 2
  test "two can pass the example" do
    assert Advent.two("5\t9\t2\t8\n9\t4\t7\t3\n3\t8\t6\t5") === 9
  end
end
