import { Chart, ScriptableContext, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Line } from "react-chartjs-2";
import { useTheme } from "@mui/material";
import { Dayjs } from "dayjs";

Chart.register(...registerables, ChartDataLabels);

interface DailyForecastChartProps {
    values: number[];
    startDay: Dayjs;
}

export default function DailyForecastChart({
    values,
    startDay,
}: DailyForecastChartProps) {
    const captions: string[] = values.map((value, index) =>
        startDay.startOf("day").add(index, "day").format("DD.MM")
    );
    const displayValues = [0, ...values, 0];
    const displayCaptions = ["", ...captions, ""];

    console.log(values);
    console.log(displayValues, displayCaptions);

    const theme = useTheme();

    return (
        <Line
            options={{
                maintainAspectRatio: false,
                devicePixelRatio: 4,
                elements: {
                    point: {
                        radius: 0,
                        hoverRadius: 0,
                    },
                },
                scales: {
                    x: {
                        position: {
                            x: 1.2,
                        },
                        grid: {
                            display: false,
                        },
                        border: {
                            display: false,
                        },
                        ticks: {
                            color(context) {
                                if (
                                    context.index === 0 ||
                                    context.index === displayValues.length - 1
                                ) {
                                    return "rgba(0, 0, 0, 0)";
                                }

                                return theme.palette.gray.main;
                            },
                            font: {
                                size: 9,
                                lineHeight: 0,
                            },
                        },
                    },
                    y: {
                        offset: true,
                        display: false,
                        grid: {
                            display: false,
                        },
                    },
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                    datalabels: {
                        align: "end",
                        padding: 0,
                        font: {
                            size: 8,
                        },
                        color: theme.palette.gray.main,
                        opacity(context) {
                            if (
                                context.dataIndex === 0 ||
                                context.dataIndex === displayValues.length - 1
                            ) {
                                return 0;
                            }

                            return 1;
                        },
                    },
                },
            }}
            data={{
                labels: displayCaptions,
                datasets: [
                    {
                        tension: 0.3,
                        borderColor: "rgba(0, 0, 0, 0)",
                        fill: true,
                        backgroundColor: (
                            context: ScriptableContext<"line">
                        ) => {
                            if (!context.chart.chartArea) {
                                return;
                            }

                            const {
                                ctx,
                                chartArea: { top, bottom },
                            } = context.chart;

                            const gradientBg = ctx.createLinearGradient(
                                0,
                                top,
                                0,
                                bottom
                            );

                            gradientBg.addColorStop(
                                0,
                                "rgba(255, 162, 91, .3)"
                            );
                            gradientBg.addColorStop(
                                0.85,
                                "rgba(255, 244, 244, .3)"
                            );

                            return gradientBg;
                        },
                        label: "",
                        data: displayValues,
                    },
                ],
            }}
        />
    );
}

