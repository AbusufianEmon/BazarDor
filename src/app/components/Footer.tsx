const Footer = () => {
  return (
    <footer className="border-t border-base-300 bg-base-100">
      <div className="container mx-auto flex flex-col gap-2 px-4 py-5 text-xs text-[#1d271f]/70 sm:text-sm md:flex-row md:items-center md:justify-between">
        <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
        <p className="md:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default Footer;