defmodule AdventTest do
  use ExUnit.Case
  doctest Advent

  # 1
  test "can do an example" do
    assert Advent.one("{{{},{},{{}}}}") === 16
  end

  test "can do another example" do
    assert Advent.one("{<a>,<a>,<a>,<a>}") === 1
  end

  test "can do another another example" do
    assert Advent.one("{{<ab>},{<ab>},{<ab>},{<ab>}}") === 9
  end

  test "can do another another another example" do
    assert Advent.one("{{<!!>},{<!!>},{<!!>},{<!!>}}") === 9
  end

  test "can do another another another another example" do
    assert Advent.one("{{<a!>},{<a!>},{<a!>},{<ab>}}") === 3
  end

  # 2
  test "can count trash example" do
    assert Advent.countTrash("<>") === 0
  end

  test "can count another trash example" do
    assert Advent.countTrash("<random characters><asdf>") === 21
  end
end
