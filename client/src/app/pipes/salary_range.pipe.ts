import {Pipe, PipeTransform} from "@angular/core";

const SALARY_RANGE = [
  '< $40k',
  '$40k - $60k',
  '$60k - $80k',
  '$80k - $120k',
  '$120k - $160k',
  '$160k - $240k',
  '> $240k',
];

@Pipe({
  name: 'salary_range'
})
export class SalaryRangePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return SALARY_RANGE[parseInt(value)];
  }

}
