import { Badge } from "./badge";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "./card";

export interface JobCardProps {
  company: string;
  description?: string;
  href?: string;
  location: string;
  onApply?: () => void;
  salary?: string;
  tags?: string[];
  title: string;
  type?: string;
}

export function JobCard({
  company,
  description = "Review this opportunity and apply if it matches your skills and goals.",
  href,
  location,
  salary,
  tags = [],
  title,
  type,
}: JobCardProps) {
  return (
    <Link href={href ?? '#'} className="block w-full min-w-0">
      <Card className="overflow-hidden h-full flex flex-col transition-all hover:border-teal-500 border-slate-200">
        <CardContent className="p-5 flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-lg font-black text-slate-600">
                {title.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <CardTitle className="truncate text-base text-slate-900">{title}</CardTitle>
                <CardDescription className="mt-1 text-xs truncate text-slate-500">
                  {company}
                </CardDescription>
                <p className="mt-1 text-xs font-semibold text-emerald-700 truncate">
                  {location}
                  {type ? <span> • {type}</span> : null}
                </p>
              </div>
            </div>
            {salary ? (
              <div className="text-right shrink-0">
                <p className="text-sm font-black text-emerald-600">{salary}</p>
                <span className="block text-[10px] font-bold text-slate-400">/month</span>
              </div>
            ) : null}
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600 line-clamp-3 break-words overflow-hidden">
            {description}
          </p>
        </CardContent>

        <CardFooter className="flex flex-wrap justify-between items-center p-5 pt-0 gap-3">
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} className="bg-slate-50 text-slate-600 border-slate-100 text-[10px]">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="inline-flex h-9 items-center justify-center rounded-xl bg-slate-950 px-5 text-[13px] font-bold text-white transition hover:bg-teal-600">
            View Details
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}