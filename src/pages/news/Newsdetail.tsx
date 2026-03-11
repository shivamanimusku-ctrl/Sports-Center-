import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { useNewsDispatch, useNewsState } from '../../context/news/context';
import { fetchArticleById } from '../../context/news/actions';
import { Dialog } from '@headlessui/react';


const NewsDetail: React.FC = () => {
  const newsState = useNewsState();
  const newsDispatch = useNewsDispatch();
  const { articleId } = useParams<{ articleId?: string }>() || {};
  const Navigate = useNavigate()

  useEffect(() => {
    if (articleId) {
      fetchArticleById(newsDispatch, parseInt(articleId));
    }
  }, [articleId, newsDispatch]);

  const { selectedArticle } = newsState;

  const [isOpen, setIsOpen] = useState(true);

  if (!selectedArticle) {
    return <div>No article selected or not found.</div>;
  }
  const closeDialogAndNavigate = () => {
    setIsOpen(false);
    Navigate('/account/dashboard'); // Navigate to /account/dashboard
  };
  const formatCustomDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate;
  };
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={ closeDialogAndNavigate}

        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl " style={{color:"black"}}>
            <img
              src={selectedArticle.thumbnail}
              alt={selectedArticle.title}
              className="w-full h-72 mb-4"
            />
            <h2 className="nws-dtl-hdln font-bold" >{selectedArticle.title}</h2>
            <p className="text-sm text-gray-500 mt-2">{formatCustomDate(selectedArticle.date)}</p>
            <p className="text-sm mt-2">
              Sport: {selectedArticle.sport.name}
            </p>
            <p className="text-sm mt-2">
              Teams: {selectedArticle.teams.map((team) => team.name).join(' vs ')}
            </p>
            <p className="text-sm mt-4 text-gray-500">{selectedArticle.summary}</p>
            <p className="text-sm mt-4">{selectedArticle.content}</p>
            <div className="mt-4">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                onClick={closeDialogAndNavigate}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default NewsDetail;
