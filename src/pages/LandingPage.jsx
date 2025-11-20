import { Button } from '@/components/ui/button';
import React from 'react'
import hero_img6 from '../assets/hero-img-6.svg';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import companies from '../data/companies'
import faqs from '../data/faqs.json'
import Autoplay from 'embla-carousel-autoplay';
import banner from '../assets/banner.jpg'
import businessMan from '../assets/business-man.png'
import businessWoman from '../assets/business-woman.png'
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from '@/components/ui/accordion';

const LandingPage = () => {
  return (
    <main className='flex flex-col px-2 sm:px-10 md:px-16 lg:px-24 gap-10 sm:gap-20 py-2'>
      <section className='flex gap-8 flex-wrap sm:flex-nowrap sm:gap-10 items-center md:gap-12 lg:gap-16 justify-center sm:justify-between'>
        <div className='flex flex-col gap-8 py-8 sm:py-0'>
          <h1 className='text-4xl text-center sm:text-start sm:text-4xl font-extrabold md:text-5xl lg:text-6xl '>
            <span className='text-3xl font-bold sm:text-4xl'>Join Top Companies</span>
            <br />Your Dream Job Is 
            <br/> <span className='font-bold'>Calling You</span>
          </h1>
          <p>Explore thousand of job listing or find the perfect candidate</p>

          <div className='flex gap-4 justify-center sm:justify-start'>
            <Button variant="blue" size="newLg">Find Jobs</Button>
            <Button variant={"red"} size="newLg">Post a job</Button>
          </div>
        </div>
        <div className=''>
          <img 
            className='top-0 left-0 -z-10 sm:z-10 absolute sm:relative w-full sm:w-[400px] shrink-0 bg-[#080d1f] py-6 box-content rounded-full'
            src={hero_img6} alt=""
          />
        </div>
      </section>

      {/* Carousel */}
      <Carousel 
        className="w-full -mt-4 sm:mt-0 md:-mt-10"
        plugins={[Autoplay({delay: 1500, stopOnInteraction: false})]}
      >
        <CarouselContent className="flex gap-5 sm:gap-16 items-center">
          {
            companies.map(({name, path, id}) => {
              return <CarouselItem key={id} className="basis-1/3 lg:basis-1/8">
                      <img 
                        src={path}
                        alt={name}
                        className='h-9 object-contain'
                      />
                     </CarouselItem>
            })
          }
        </CarouselContent>
      </Carousel>

      {/* Banner */}

      <div className=' w-full h-[60%]  mt-4'>
        <img src={banner} alt="" />
      </div>

      {/* Cards */}

      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mid:gap-6 lg:gap-10'>
        <div className='flex items-end rounded justify-between lg:gap-2 bg-[#24272a]'>
          <div className='gap-3 flex py-6 flex-col justify-center pl-3 sm:pl-6 md:pl-4 lg:pl-8'>
            <p className='font-medium text-2xl'>Employe</p>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque sunt deserunt autem</p>
            <button className='rounded py-2 bg-blue-950'>Register Account</button>
          </div>
          <img className='h-28 sm:h-40 md:h-32 lg:h-48' src={businessWoman} alt="Business man" />
        </div>
        <div className='flex rounded items-end justify-between lg:gap-2 bg-[#0a162d]'>
          <div className='gap-3 flex py-6 flex-col justify-center pl-3 sm:pl-6 md:pl-4 lg:pl-8'>
            <p className='font-medium text-2xl'>Employe</p>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque sunt deserunt autem</p>
            <button className='rounded py-2 bg-blue-950'>Register Account</button>
          </div>
          <img className='h-28 sm:h-40 md:h-32 lg:h-48' src={businessMan} alt="Business man" />
        </div>
      </div>


      {/* Faqs */}

      <Accordion type="single" collapsible>
        {faqs.map(({question, answer}, i) => {
          return i < 5 && (
            <AccordionItem key={i} value={`item-${i+1}`}>
              <AccordionTrigger>{question}</AccordionTrigger>
              <AccordionContent>
                {answer}
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>




    </main>
  );
}

export default LandingPage;