import { SkeletonGroup } from "./SkeletonGroup";
import { SkeletonLines } from "./SkeletonLines";
import Skeleton from "./skeleton";

export function ArticleLoading() {
  return (
    <div className="p-4">
      <SkeletonLines lines={4} width="100%" lastLineWidth="70%" />
    </div>
  );
}

export function UserCardSkeleton() {
    return (
      <div className="flex items-center p-4">
        <Skeleton variant="circle" width={48} height={48} />
        <div className="flex-1 ml-3">
          <SkeletonLines lines={2} width="100%" lastLineWidth="70%" />
        </div>
      </div>
    );
  }


  export function CardSkeleton() {
    return (
      <div className="p-4 rounded-lg shadow-sm w-80">
       <Skeleton variant="text" width="100%" height={160} radius={8} className="mb-4" animated={false}/>
      </div>
    );
  }
  