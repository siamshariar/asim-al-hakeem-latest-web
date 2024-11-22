import React, { useEffect, useRef } from 'react';

const BookAppointment = () => {
  const dateInputRef = useRef(null);
  const timeInputRef = useRef(null);

  useEffect(() => {
    const handleFocusDate = () => {
      dateInputRef.current.showPicker();
    };

    const handleFocusTime = () => {
      timeInputRef.current.showPicker();
    };

    const dateInput = dateInputRef.current;
    const timeInput = timeInputRef.current;

    if (dateInput) {
      dateInput.addEventListener('focus', handleFocusDate);
    }
    if (timeInput) {
      timeInput.addEventListener('focus', handleFocusTime);
    }

    return () => {
      if (dateInput) {
        dateInput.removeEventListener('focus', handleFocusDate);
      }
      if (timeInput) {
        timeInput.removeEventListener('focus', handleFocusTime);
      }
    };
  }, []);

  return (
    <section className='appointment section px-4'>
      <div className='container mx-auto'>
        <h2 className='appointment__title h2 mb-5 xl:mb-[50px] text-center xl:text-left'>
          Book Appointment or call:
          <span className='text-accent-tertiary'>(+487 384 9452)</span>
        </h2>
        <form className='appointment__form flex flex-col gap-y-5'>
          <div className='flex flex-col xl:flex-row gap-5'>
            <input type="text" className="input" placeholder="Full Name" />
            <input type="text" className="input" placeholder="Phone Number" />
          </div>
          <div className='flex flex-col xl:flex-row gap-5'>
            <input
              type="date"
              className="input"
              ref={dateInputRef}
            />
            <input
              type="time"
              className="input"
              ref={timeInputRef}
            />
          </div>
          <button type="submit" className='btn btn-lg btn-accent self-start'>
            Book an appointment
          </button>
        </form>
      </div>
    </section>
  );
};

export default BookAppointment;
