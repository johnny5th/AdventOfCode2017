defmodule Advent do
  def one(bank) do
    redistribute(bank, [])
  end

  def redistribute(bank, prevBanks) do
      largestBankSize = Enum.max(bank)
      largestBankIndex = Enum.find_index(bank, fn(x) -> x === largestBankSize end)

      bankAfterDistribution = distribute(
        List.update_at(bank, largestBankIndex, fn(_) -> 0 end),
        largestBankIndex + 1,
        largestBankSize
      )

      allBanks = [bankAfterDistribution | prevBanks]

      case Enum.member?(prevBanks, bankAfterDistribution) do
        true ->
          %{
            cycleCount: length(allBanks),
            loopSize: length(prevBanks) - Enum.find_index(Enum.reverse(allBanks), fn(x) -> x === bankAfterDistribution end)
          }
        false ->
          redistribute(bankAfterDistribution, allBanks)
      end
  end

  def distribute(bank, index, leftToDistribute) do
    case leftToDistribute === 0 do
      true -> bank
      false ->
        case index > length(bank) - 1 do
          true ->
            distribute(bank, 0, leftToDistribute)
          false ->
            distribute(
              List.update_at(bank, index, &(&1 + 1)),
              index + 1,
              leftToDistribute - 1
            )
        end
    end
  end
end
