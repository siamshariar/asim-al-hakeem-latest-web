import React from 'react';

const BookAppointment = () => {
  return (
    <section className='appointment section'>
      <div className='container mx-auto'>
        <h2 className='appointment__title h2 mb-5 xl:mb-[50px] text-center xl:text-left'>
          Book Appointment or call:
          <span className='text-accent-tertiary'>(+487 384 9452)</span>
        </h2>
        <form className='appointment__form flex flex-col gap-y-5'>
          <div className='flex flex-col xl:flex-row gap-5'>
            <input type="text" class="input" placeholder="Full Name" />
            <input type="text" class="input" placeholder="Phone Number" />
          </div>
          <div className='flex flex-col xl:flex-row gap-5'>
            <input type="date" class="input" />
            <input type="time" class="input" />
          </div>
          <button className='btn btn-lg btn-accent self-start'>
            Book an appointment
          </button>
        </form>
      </div>
    </section>
  );
};

export default BookAppointment;
