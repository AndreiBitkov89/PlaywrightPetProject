export class SortPrice {
  parsePrice(raw: string): number {
    const s = (raw ?? "").replace(/\s|\u00A0/g, "").replace(/[^\d.,-]/g, "");
    const lastSep = Math.max(s.lastIndexOf(","), s.lastIndexOf("."));
    if (lastSep === -1) return Number(s);
    const intPart = s.slice(0, lastSep).replace(/[.,]/g, "");
    const fracPart = s.slice(lastSep + 1);
    return Number(`${intPart}.${fracPart}`);
  }

  isAsc(nums: number[]): boolean {
    for (let i = 1; i < nums.length; i++) {
      if (nums[i] < nums[i - 1]) {
        console.log(nums[i]);
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
