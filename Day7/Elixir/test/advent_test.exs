defmodule AdventTest do
  use ExUnit.Case
  doctest Advent

  test "can parse the example" do
    assert (File.read!("input_test.txt") |> Advent.parse === [%{children: [], tower: "pbga", weight: 66}, %{children: [], tower: "xhth", weight: 57}, %{children: [], tower: "ebii", weight: 61}, %{children: [], tower: "havc", weight: 66}, %{children: [], tower: "ktlj", weight: 57}, %{children: ["ktlj", "cntj", "xhth"], tower: "fwft", weight: 72}, %{children: [], tower: "qoyq", weight: 66}, %{children: ["pbga", "havc", "qoyq"], tower: "padx", weight: 45}, %{children: ["ugml", "padx", "fwft"], tower: "tknk", weight: 41}, %{children: [], tower: "jptl", weight: 61}, %{children: ["gyxo", "ebii", "jptl"], tower: "ugml", weight: 68}, %{children: [], tower: "gyxo", weight: 61}, %{children: [], tower: "cntj", weight: 57}])
  end

  # 1
  test "one can pass the example" do
    assert File.read!("input_test.txt") |> Advent.one === "tknk"
  end

  # 2
end
