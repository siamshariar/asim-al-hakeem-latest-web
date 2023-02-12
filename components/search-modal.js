import { useRef } from "react";
import { useRouter } from "next/router";

export default function SearchModal() {
  const router = useRouter();
  const inputRef = useRef();

  const hideSearchModal = (event) => {
    document.querySelector(".search-modal-wrap").classList.remove("active");
    document.querySelector(".search-modal").classList.remove("active");
    document.body.classList.remove("modal-active");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const href = "/search?q=" + inputRef.current.value;
    router.push(href);
    hideSearchModal();
  };

  return (
    <>
      <div className="search-modal-wrap"></div>
      <div className="search-modal">
        <span className="close search-close" onClick={hideSearchModal}></span>
        <form
          action=""
          className="search"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="search"
            placeholder="অনুসন্ধান..."
            ref={inputRef}
          />
          <p>উপরে টাইপ করুন এবং অনুসন্ধান করতে এন্টার চাপুন।</p>
        </form>
      </div>
    </>
  );
}
