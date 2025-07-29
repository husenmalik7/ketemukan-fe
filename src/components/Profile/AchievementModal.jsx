import React from 'react';
import NoData from '../NoData';

function AchievementModal({ myAchievements, openModalAchievement, setOpenModalAchievement }) {
  const RenderMyAchievementPicture = ({ img }) => {
    return img ? (
      <img
        src={img}
        className="h-full w-full rounded-xl object-cover transition-transform duration-500 hover:scale-105"
        alt="achievement"
      />
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-24 text-red-300"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
        />
      </svg>
    );
  };

  function renderAchievementCondition(type, value) {
    const condition = {
      found_items: 'menemukan',
      lost_items: 'menghilangkan',
      comments: 'ngekomen',
    };

    return `karena kamu telah ${condition[type]} ${value} ${type === 'comments' ? 'komentar' : 'item'}`;
  }

  const RenderMyAchievement = () => {
    if (myAchievements.length > 0) {
      return (
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          {myAchievements.map((item, index) => (
            <React.Fragment key={index}>
              {/* col-1 */}
              <div className="col-span-1 mx-6">
                <div className="aspect-video overflow-hidden rounded-xl">
                  <div className="flex h-full w-full items-center justify-center rounded-xl bg-gray-400 object-cover transition-transform duration-500 hover:scale-105">
                    <RenderMyAchievementPicture img={item.picture_url} />
                  </div>
                </div>
              </div>

              {/* col-2 */}
              <div className="col-span-1 flex flex-col justify-center text-center md:col-span-2">
                <p className="font-bold">{item?.name}</p>
                <p className="text-xs">
                  {renderAchievementCondition(item?.condition_type, item?.condition_value)}
                </p>
                <p className="text-sm">{item?.description}</p>

                <hr className="mt-3 mb-2 h-px border-0 bg-gray-300 md:hidden" />
              </div>
            </React.Fragment>
          ))}
        </div>
      );
    }

    return (
      <div className="m-4 flex flex-col items-center justify-center">
        <NoData className="text-6xl text-[#FB7A7C]" />
        <p className="text-xl font-medium text-[#FB7A7C]">Oops tidak ada data</p>
      </div>
    );
  };

  return (
    // {/* Main modal */}
    <div
      id="crud-modal"
      tabIndex="-1"
      className={`${openModalAchievement ? '' : 'hidden'} fixed top-0 right-0 left-0 z-50 flex h-screen max-h-full w-full items-center justify-center bg-gray-100/70 md:inset-0`}
    >
      <div className="relative max-h-full w-full max-w-3xl p-4">
        {/* Modal content */}
        <div className="relative rounded-lg bg-white shadow-sm">
          {/* Modal header */}
          <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 md:p-5">
            <h3 className="text-lg font-semibold text-gray-900">My Achievement 🏆</h3>
            <button
              type="button"
              onClick={() => setOpenModalAchievement(false)}
              className="ms-auto inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
              data-modal-toggle="crud-modal"
            >
              <svg
                className="h-3 w-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* Modal body */}
          <form className="max-h-100 overflow-y-auto p-4 md:p-5">
            <RenderMyAchievement />
          </form>
        </div>
      </div>
    </div>
  );
}

export default AchievementModal;
