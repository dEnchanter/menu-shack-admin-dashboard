import { ArrowTrendingDownIcon, ArrowTrendingUpIcon } from "@heroicons/react/24/outline";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
// import { Card, CardBody, CardHeader, Chip } from "@nextui-org/react";

export function DashboardCard({
  icon: Icon, // Icon component passed as prop
  badgeValue, // Value to be displayed in the badge
  mainValue, // Main value to display (above "Total Items" or similar label)
  label, // Label (e.g., "Total Items")
  trend, // Trend direction ('up' or 'down')
}) {
  
  const color = trend == 'up' ? 'green-500' : 'red-500';
  const TrendingIcon = trend == 'up' ? ArrowTrendingUpIcon : ArrowTrendingDownIcon;

  return (
    <Card className="max-w-[500px] bg-white px-3 rounded-lg shadow-md w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <span>
            <Icon className="w-6 h-6" />
          </span>
          <Badge className={`bg-${color} text-xs`} radius="full sm">
            <span className="font-semibold text-white">{badgeValue}%</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-row items-center justify-between">
        <div className="flex flex-col justify-center items-start">
          <p className="font-bold text-2xl">{mainValue}</p>
          <p className="text-sm font-extralight">{label}</p>
        </div>
        <div>
          <TrendingIcon className={`w-[3.5rem] h-[3.5rem] text-${color}`} />
        </div>
      </CardContent>
    </Card>
  );
}
