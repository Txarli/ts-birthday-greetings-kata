import { OurDate } from '../src/domain/model/OurDate';

describe('OurDate', () => {
  it('getters', () => {
    const ourDate = new OurDate('1789/01/24');

    expect(ourDate.getMonth()).toEqual(1);
    expect(ourDate.getDay()).toEqual(24);
  });

  it('is same date', () => {
    const ourDate = new OurDate('1789/01/24');
    const sameDay = new OurDate('2001/01/24');
    const notSameDay = new OurDate('1789/01/25');
    const notSameMonth = new OurDate('1789/02/25');

    expect(ourDate.isSameDay(sameDay)).toBeTruthy();
    expect(ourDate.isSameDay(notSameDay)).toBeFalsy();
    expect(ourDate.isSameDay(notSameMonth)).toBeFalsy();
  });

  it('is equals', () => {
    const base = new OurDate('2000/01/02');
    const same = new OurDate('2000/01/02');
    const different = new OurDate('2000/01/04');

    expect(base.equals({})).toBeFalsy();
    expect(base.equals(base)).toBeTruthy();
    expect(base.equals(same)).toBeTruthy();
    expect(base.equals(different)).toBeFalsy();
  });
});
