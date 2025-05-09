export default function Footer() {
    return (
        <footer class="Footer bg-white pt-10 px-4 ">
            <div class="container mx-auto pb-12 hidden md:block">
                <div class="flex flex-col xl:flex-row gap-x-5 gap-y-10">
                    <div class="footer__item  flex-1">
                        {/* <a href="">
                            <img class="mb-[30px] w-[250px]" src="/img/id/logo.png" alt="" />
                        </a> */}
                        <div class="flex flex-col gap-y-3 mb-10">
                            <div class="flex items-center gap-x-[60px]">
                                <i class="ri-map-pin-fill text-[24px] text-accent"></i>
                                <div>123 Arling, Miola, NY</div>
                            </div>
                            <div class="flex items-center gap-x-[60px]">
                                <i class="ri-mail-fill text-[24px] text-accent"></i>
                                <div>assimalhakeem@email.com</div>
                            </div>
                            <div class="flex items-center gap-x-[60px]">
                                <i class="ri-phone-fill text-[24px] text-accent"></i>
                                <div>(+123 456 78910)</div>
                            </div>
                        </div>
                        <div class="flex gap-[14px] text-[30px]">
                            <div class="p-[10px] rounded-[10px] shadow-custom2 text-accent-tertiary hover:text-accent cursor-pointer transition-all">
                                <a href="https://www.facebook.com/SheikhAssimAlhakeemTeam/" target="_blank"><i class="ri-facebook-circle-fill"></i></a>
                            </div>
                            <div class="p-[10px] rounded-[10px] shadow-custom2 text-accent-tertiary hover:text-accent cursor-pointer transition-all">
                                <a href="https://www.instagram.com/assimalhakeem/?hl=en" target="_blank"><i class="ri-instagram-fill"></i></a>
                            </div>
                            <div class="p-[10px] rounded-[10px] shadow-custom2 text-accent-tertiary hover:text-accent cursor-pointer transition-all">
                                <a href="https://x.com/Assimalhakeem" target="_blank"><i class="ri-twitter-fill"></i></a>
                            </div>
                            <div class="p-[10px] rounded-[10px] shadow-custom2 text-accent-tertiary hover:text-accent cursor-pointer transition-all">
                                <a href="https://www.linkedin.com/in/assim-alhakeem-49470810/" target="_blank"><i class="ri-linkedin-box-fill"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="footer__item flex-1">
                        <h4 class="text-[22px] font-bold mb-5">Quick Links</h4>
                        <div class="flex gap-x-5">
                            <ul class="flex-1 flex flex-col text-[20px] gap-y-5">
                                <li><a href="/" class="hover:text-accent transition-all">Home</a></li>
                                <li><a href="/lectures" class="hover:text-accent transition-all">Lectures</a></li>
                                <li><a href="/articles" class="hover:text-accent transition-all">Articles</a></li>
                                <li><a href="/books" class="hover:text-accent transition-all">Books</a></li>
                                <li><a href="/questions" class="hover:text-accent transition-all">Qna</a></li>
                            </ul>
                            <ul class="flex-1 flex flex-col text-[20px] gap-y-5">                                
                                <li><a href="/counselling" class="hover:text-accent transition-all">Counselling</a></li>
                                <li><a href="/ask-question" class="hover:text-accent transition-all">Questions</a></li>
                                <li><a href="/contact" class="hover:text-accent transition-all">Contact</a></li>
                                <li><a href="/about" class="hover:text-accent transition-all">About</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="py-[30px]  border-t-[1px] border-[#DCDCDC]">
                <div class="container mx-auto text-center">
                    <div class="font-light text-base">&copy; 2024 deeniinfotech - All rights reserved.</div>
                </div>
            </div>
        </footer>
    )
    
}