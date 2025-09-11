import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "@/utils/translations";
import { cn } from "@/lib/utils";
import { MapPin, Phone, File, Mail, Facebook, Youtube, Linkedin } from "lucide-react";
import { getApiBaseUrl } from "@/utils/api";

/**
 * Footer component with contact information, legal details, and social media links
 */
const Footer: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [totalVisits, setTotalVisits] = React.useState<number | null>(null);
  const [isLoadingVisits, setIsLoadingVisits] = React.useState<boolean>(false);
  const [visitsError, setVisitsError] = React.useState<string | null>(null);
  
  React.useEffect(() => {
    let isCancelled = false;
    const fetchVisits = async () => {
      try {
        setIsLoadingVisits(true);
        setVisitsError(null);
        const apiBaseUrl = getApiBaseUrl();
        const res = await fetch(`${apiBaseUrl}/api/stats/total-visits`, {
          method: 'GET',
          headers: { 'Accept': 'application/json' },
          credentials: 'include',
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const value =
          data?.total_visits ??
          data?.total ??
          data?.visits ??
          data?.count ??
          data?.totalVisits;
        if (!isCancelled) setTotalVisits(typeof value === 'number' ? value : parseInt(String(value || 0), 10));
      } catch (e: any) {
        if (!isCancelled) setVisitsError(e?.message || 'Failed to load visits');
      } finally {
        if (!isCancelled) setIsLoadingVisits(false);
      }
    };
    fetchVisits();
    return () => { isCancelled = true; };
  }, []);
  
  // Theme-specific styles
  const bgColor = theme === "dark" ? "bg-dseza-dark-secondary-bg" : "bg-dseza-light-secondary-bg";
  const textColor = theme === "dark" ? "text-dseza-dark-main-text" : "text-dseza-light-main-text";
  const secondaryTextColor = theme === "dark" ? "text-dseza-dark-secondary-text" : "text-dseza-light-secondary-text";
  const accentColor = theme === "dark" ? "text-dseza-dark-primary-accent hover:text-dseza-dark-primary-accent-hover" : "text-dseza-light-primary-accent hover:text-dseza-light-primary-accent-hover";
  const bottomBarBgColor = theme === "dark" ? "bg-dseza-dark-hover-bg" : "bg-dseza-light-hover-bg";
  
  return (
    <footer className={cn(
      theme === "dark" ? "bg-dseza-dark-secondary-bg" : "bg-[#FFFFFFF]"
    )}>
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Column 1: Contact Information */}
          <div>
            <h3 className={cn(
              "font-montserrat font-semibold text-lg mb-4",
              textColor
            )}>
              {t('footer.management')}
            </h3>
            
            <div className="space-y-2">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 mt-1 flex-shrink-0" />
                <p className={cn("font-inter text-sm", secondaryTextColor)}>
                  {t('footer.address')}
                </p>
              </div>
              
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-2 flex-shrink-0" />
                <p className={cn("font-inter text-sm", secondaryTextColor)}>
                  {t('footer.tel')}: 0236 3666117
                </p>
              </div>
              
              <div className="flex items-center">
                <File className="w-5 h-5 mr-2 flex-shrink-0" />
                <p className={cn("font-inter text-sm", secondaryTextColor)}>
                  {t('footer.fax')}: 0236.3666100
                </p>
              </div>
              
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2 flex-shrink-0" />
                <p className={cn("font-inter text-sm", secondaryTextColor)}>
                  {t('footer.email')}: dseza@danang.gov.vn
                </p>
              </div>
            </div>
          </div>
          
          {/* Column 2: Map Location */}
          <div>
            <h3 className={cn(
              "font-montserrat font-semibold text-lg mb-4",
              textColor
            )}>
              {t('homepage.location')}
            </h3>
            
            <div className="rounded-lg overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3833.4418592568395!2d108.0822033!3d16.0944277!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421f89a43bfb03%3A0x40f66e6ba7346b99!2zQmFuIHF14bqjbiBsw70gS2h1IGPDtG5nIG5naOG7hyBjYW8gdsOgIGPDoWMgS2h1IGPDdG5nIG5naGnhu4dwIMSQw6AgTuG6tW5n!5e0!3m2!1svi!2s!4v1736085791335!5m2!1svi!2s" 
                width="100%" 
                height="160" 
                style={{border: 0}} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Ban quản lý Khu công nghệ cao và các Khu công nghiệp Đà Nẵng"
              />
            </div>
          </div>
          
          {/* Column 4: Citation and Connect */}
          <div>
            <h3 className={cn(
              "font-montserrat font-semibold text-lg mb-4",
              textColor
            )}>
              {t('footer.citationConnect')}
            </h3>
            
            <div className="flex space-x-4">
              <a 
                href="#" 
                aria-label="Facebook"
                className={cn("transition-colors", accentColor)}
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a 
                href="#" 
                aria-label="YouTube"
                className={cn("transition-colors", accentColor)}
              >
                <Youtube className="w-6 h-6" />
              </a>
              <a 
                href="#" 
                aria-label="LinkedIn"
                className={cn("transition-colors", accentColor)}
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Legal banner moved below grid */}
      <div className="border-t border-white/10">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <a href="#" aria-label={t('footer.networkCredibility')} className="md:shrink-0">
              <img 
                src="/placeholder.svg" 
                alt={t('footer.networkCredibility')} 
                className={cn("w-[380px] max-w-full h-auto rounded-md border", theme === "dark" ? "border-[#334155]" : "border-[#D1D5DB]")} 
              />
            </a>
            <div className="flex-1">
              <div className={cn("space-y-2 text-sm", secondaryTextColor)}>
                <p className="font-inter">
                  {t('footer.license')}
                </p>
                <p className="font-inter">
                  {t('footer.editor')}
                </p>
                <p className="font-inter">
                  {t('footer.citationNote')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className={cn(
        "py-3 px-4 sm:px-6 lg:px-8",
        bottomBarBgColor
      )}>
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-xs">
          <p className={cn("font-inter mb-2 sm:mb-0 text-center sm:text-left", secondaryTextColor)}>
            {t('footer.copyright')}
          </p>
          <p className={cn("font-inter", secondaryTextColor)}>
            {t('footer.visitorCount')}: {isLoadingVisits ? '...' : (totalVisits !== null ? totalVisits.toLocaleString('vi-VN') : '—')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
