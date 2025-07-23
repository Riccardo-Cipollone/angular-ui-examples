import {
  Component,
  effect,
  ElementRef,
  input,
  untracked,
  viewChild,
} from "@angular/core";
import Chart from "chart.js/auto";

export type ChartType =
  | "bar"
  | "pie"
  | "doughnut"
  | "polarArea"
  | "radar"
  | "line";

@Component({
  selector: "app-chartjs",
  imports: [],
  template: `
    <h1 class="menu-title">Canvas with chart</h1>
    <canvas #myChart></canvas>
  `,
  styles: ``,
})
export class Chartjs {
  canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>("myChart");
  chartData = input<number[]>([]);
  labels = input<string[]>([]);
  type = input<ChartType>("line");

  chart: Chart | null = null;

  constructor() {
    // Effect used for updating the chart data
    effect(() => {
      if (this.chart) {
        console.log("Update chart data");
        this.chart.data.labels = this.labels() || [];
        this.chart.data.datasets[0].data = this.chartData() || [];
        this.chart.update();
      } else {
        this.init(this.labels(), this.chartData(), this.type());
      }
    });

    // Effect used to re-create the chart whenever we switch type
    effect(() => {
      // UNTRACKED: doesnt count signals as dependencies of the effect
      const labels = untracked(this.labels) || [];
      const data = untracked(this.chartData) || [];
      const type = this.type();
      this.chart?.destroy();
      this.init(labels, data, type);
    });
  }

  init(labels: string[], data: number[], type: ChartType) {
    this.chart = new Chart(this.canvasRef()?.nativeElement, {
      type: type,
      data: {
        labels: labels || [],
        datasets: [
          {
            label: "# of Votes",
            data: data || [],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
