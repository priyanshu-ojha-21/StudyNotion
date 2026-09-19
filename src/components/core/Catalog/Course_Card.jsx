import React, { useEffect, useState } from 'react'
import RatingStars from '../../common/RatingStars'
import GetAvgRating from '../../../utils/avgRating';
import { Link } from 'react-router-dom';

const Course_Card = ({ course, Height }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course?.ratingAndReviews);
    setAvgReviewCount(count);
  }, [course]);

  return (
    <div className="w-full">
      <Link to={`/courses/${course?._id}`}>
        <div className="flex flex-col gap-2 rounded-lg">
          <div className="rounded-lg overflow-hidden">
            <img
              src={course?.thumbnail}
              alt="course thumbnail"
              className={`${
                Height ? Height : "h-[180px] sm:h-[250px] lg:h-[300px]"
              } w-full rounded-xl object-cover`}
            />
          </div>
          <div className="flex flex-col gap-1 sm:gap-2 px-1 py-3">
            <p className="text-base sm:text-xl font-semibold text-richblack-5 line-clamp-2">
              {course?.courseName}
            </p>
            <p className="text-xs sm:text-sm text-richblack-50">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
              <span className="text-yellow-5">{avgReviewCount || 0}</span>
              <RatingStars Review_Count={avgReviewCount} />
              <span className="text-richblack-400">
                {course?.ratingAndReviews?.length || 0} Ratings
              </span>
            </div>
            <p className="text-base sm:text-xl font-bold text-richblack-5">
              Rs. {course?.price}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Course_Card;