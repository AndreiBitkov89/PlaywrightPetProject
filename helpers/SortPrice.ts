export class SortPrice {
  parsePrice(str: string): number | null {
    const match = str.match(/[\d.,]+/);
    if (!match) return null;
    const clean = match[0].replace(/\./g, "").replace(",", ".");
    return parseFloat(clean);
  }

  isAsc(nums: number[]): boolean {
    for (let i = 1; i < nums.length; i++) {
      if (nums[i] < nums[i - 1]) {
        return false;
      }
    }
    return true;
  }

  isDesc(nums: number[]): boolean {
    for (let i = 1; i < nums.length; i++)
      if (nums[i] > nums[i - 1]) return false;
    return true;
  }
}
