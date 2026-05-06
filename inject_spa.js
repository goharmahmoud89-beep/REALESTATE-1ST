const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. Replace the header of the projects section and wrap it
html = html.replace(
    /<div class="text-center mb-16">[\s\S]*?<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">/,
    `<div id="destinations-view">
                <div class="text-center mb-16">
                    <h2 class="text-3xl md:text-5xl font-bold text-navy mb-4">اختر <span class="text-gold">وجهتك</span></h2>
                    <div class="w-24 h-1 bg-gold mx-auto rounded"></div>
                    <p class="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">
                        اكتشف أفضل المشاريع العقارية لأهم المطورين في أرقى الوجهات في مصر.
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">`
);

// 2. Change onclick events
html = html.replace(
    /onclick="document.getElementById\('interest'\).value='new_cairo'; document.getElementById\('contact'\).scrollIntoView\(\{behavior: 'smooth'\}\)"/g,
    `onclick="showDestinationProjects('new_cairo', 'القاهرة الجديدة')"`
);
html = html.replace(
    /onclick="document.getElementById\('interest'\).value='zayed'; document.getElementById\('contact'\).scrollIntoView\(\{behavior: 'smooth'\}\)"/g,
    `onclick="showDestinationProjects('zayed', 'الشيخ زايد')"`
);
html = html.replace(
    /onclick="document.getElementById\('interest'\).value='october'; document.getElementById\('contact'\).scrollIntoView\(\{behavior: 'smooth'\}\)"/g,
    `onclick="showDestinationProjects('october', '6 أكتوبر')"`
);
html = html.replace(
    /onclick="document.getElementById\('interest'\).value='north_coast'; document.getElementById\('contact'\).scrollIntoView\(\{behavior: 'smooth'\}\)"/g,
    `onclick="showDestinationProjects('north_coast', 'الساحل الشمالي')"`
);
html = html.replace(
    /onclick="document.getElementById\('interest'\).value='sokhna'; document.getElementById\('contact'\).scrollIntoView\(\{behavior: 'smooth'\}\)"/g,
    `onclick="showDestinationProjects('sokhna', 'العين السخنة')"`
);
html = html.replace(
    /onclick="document.getElementById\('interest'\).value='new_capital'; document.getElementById\('contact'\).scrollIntoView\(\{behavior: 'smooth'\}\)"/g,
    `onclick="showDestinationProjects('new_capital', 'العاصمة الإدارية الجديدة')"`
);

// 3. Add the dedicated projects view after the destinations grid
html = html.replace(
    /<!-- Why Choose Us -->/,
    `            </div> <!-- End of grid -->
            </div> <!-- End of destinations-view -->

            <!-- Dedicated Projects View -->
            <div id="projects-view" class="hidden">
                <div class="mb-10 flex flex-col md:flex-row items-center justify-between border-b border-gray-200 pb-6 gap-4">
                    <button onclick="backToDestinations()" class="flex items-center gap-2 text-navy hover:text-gold font-bold transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                        العودة للوجهات
                    </button>
                    <h2 class="text-3xl md:text-4xl font-bold text-navy text-center flex-1">مشاريع <span id="destination-title" class="text-gold"></span></h2>
                    <div class="w-24 md:w-auto"></div>
                </div>
                
                <div id="projects-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    <!-- Projects will be injected here -->
                </div>
            </div>

        </div>
    </section>

    <!-- Why Choose Us -->`
);

// Fix double closing div if replacing logic above added too many
// The original grid ends, and then we have </div> </div> </section>
// Let's refine the replacement: The original file has:
/*
                </div>
            </div>
        </div>
    </section>

    <!-- Why Choose Us -->
*/
// The first `</div>` closes `New Capital` project. The second `</div>` closes the `grid`. The third `</div>` closes `max-w-7xl`.
// So we should replace the last two `</div></div></section>` before `<!-- Why Choose Us -->`.

// Let's do it safely:
html = html.replace(
    /            <\/div>\n        <\/div>\n    <\/section>\n\n    <!-- Why Choose Us -->/,
    `            </div> <!-- Close destinations-view -->
        </div>
    </section>

    <!-- Why Choose Us -->`
);


// 4. Inject script logic
const scriptLogic = \`
    <script>
        const developers = {
            'mountainview': { name: 'ماونتن فيو', logo: 'https://logo.clearbit.com/mountainviewegypt.com' },
            'palmhills': { name: 'بالم هيلز', logo: 'https://logo.clearbit.com/palmhillsdevelopments.com' },
            'sodic': { name: 'سوديك', logo: 'https://logo.clearbit.com/sodic.com' },
            'emaar': { name: 'إعمار', logo: 'https://logo.clearbit.com/emaar.com' },
            'ora': { name: 'أورا', logo: 'https://logo.clearbit.com/oradevelopers.com' },
            'madinetmasr': { name: 'مدينة مصر', logo: 'https://logo.clearbit.com/madinetmasr.com' },
            'majidalfuttaim': { name: 'ماجد الفطيم', logo: 'https://logo.clearbit.com/majidalfuttaim.com' },
            'alahlysabbour': { name: 'الأهلي صبور', logo: 'https://logo.clearbit.com/alahlysabbour.com' },
            'nile': { name: 'النيل للتطوير', logo: 'https://logo.clearbit.com/niledevelopments.com' },
            'orascom': { name: 'أوراسكوم', logo: 'https://logo.clearbit.com/orascom.com' },
            'ccr': { name: 'CCR', logo: 'https://logo.clearbit.com/ccr-developments.com' },
            'misritalia': { name: 'مصر إيطاليا', logo: 'https://logo.clearbit.com/misritaliaproperties.com' },
            'tatweermisr': { name: 'تطوير مصر', logo: 'https://logo.clearbit.com/tatweermisr.com' },
            'hydepark': { name: 'هايد بارك', logo: 'https://logo.clearbit.com/hydeparkdevelopments.com' },
            'cityedge': { name: 'سيتي إيدج', logo: 'https://logo.clearbit.com/cityedgedevelopments.com' },
            'lmd': { name: 'LMD', logo: 'https://logo.clearbit.com/lmd.com.eg' },
            'tmg': { name: 'طلعت مصطفى', logo: 'https://logo.clearbit.com/tmg.com.eg' }
        };

        const defaultLogo = 'https://ui-avatars.com/api/?name=Real+Estate&background=0A192F&color=D4AF37';

        const getLogo = (devKey) => developers[devKey] ? developers[devKey].logo : defaultLogo;
        const getDevName = (devKey) => developers[devKey] ? developers[devKey].name : devKey;

        const projectsData = {
            'new_cairo': [
                { name: 'ميفيدا (Mivida)', dev: 'emaar' },
                { name: 'ماونتن فيو آي سيتي', dev: 'mountainview' },
                { name: 'بالم هيلز التجمع', dev: 'palmhills' },
                { name: 'فيليت (Villette)', dev: 'sodic' },
                { name: 'إيستاون (Eastown)', dev: 'sodic' },
                { name: 'تاج سيتي', dev: 'madinetmasr' },
                { name: 'كايرو فيستيفال سيتي', dev: 'majidalfuttaim' },
                { name: 'لاميرادا', dev: 'alahlysabbour' },
                { name: 'زيد إيست', dev: 'ora' },
                { name: 'ستيت (Stei8ht)', dev: 'lmd' },
                { name: 'آريا (Aria)', dev: 'alahlysabbour' },
                { name: 'هايد بارك', dev: 'hydepark' },
                { name: 'إي دي إن سي (EDNC)', dev: 'sodic' },
                { name: 'كابيتال جاردنز', dev: 'palmhills' },
                { name: 'ماونتن فيو هايد بارك', dev: 'mountainview' }
            ],
            'zayed': [
                { name: 'زيد ويست', dev: 'ora' },
                { name: 'كايرو جيت', dev: 'emaar' },
                { name: 'بيفرلي هيلز', dev: 'sodic' },
                { name: 'ذا إستيتس (The Estates)', dev: 'sodic' },
                { name: 'ألجريا (Allegria)', dev: 'sodic' },
                { name: 'فاي (VYE)', dev: 'sodic' },
                { name: 'كارميل (Karmell)', dev: 'sodic' },
                { name: 'بيل ڤي (Belle Vie)', dev: 'emaar' },
                { name: 'كازا (Casa)', dev: 'palmhills' },
                { name: 'بالم باركس', dev: 'palmhills' },
                { name: 'سيلفا (Silva)', dev: 'ora' },
                { name: 'ريفرز (Rivers)', dev: 'tatweermisr' },
                { name: 'ماونتن فيو زايد', dev: 'mountainview' },
                { name: 'نايا ويست', dev: 'nile' },
                { name: 'جوار', dev: 'palmhills' }
            ],
            'october': [
                { name: 'باديا (Badya)', dev: 'palmhills' },
                { name: 'بالم هيلز أكتوبر', dev: 'palmhills' },
                { name: 'ماونتن فيو تشيل أوت', dev: 'mountainview' },
                { name: 'ماونتن فيو آي سيتي', dev: 'mountainview' },
                { name: 'أو ويست (O West)', dev: 'orascom' },
                { name: 'كيفا (Keeva)', dev: 'alahlysabbour' },
                { name: 'ذا كراون', dev: 'palmhills' },
                { name: 'وودفيل', dev: 'palmhills' },
                { name: 'أكتوبر بلازا', dev: 'sodic' },
                { name: 'جولف فيوز', dev: 'palmhills' },
                { name: 'تاوني (Tawny)', dev: 'hydepark' },
                { name: 'تريليوم', dev: 'sodic' },
                { name: 'صن كابيتال', dev: 'tatweermisr' },
                { name: 'ماونتن فيو أكتوبر بارك', dev: 'mountainview' },
                { name: 'أشجار سيتي', dev: 'madinetmasr' }
            ],
            'north_coast': [
                { name: 'مراسي (Marassi)', dev: 'emaar' },
                { name: 'سول (Soul)', dev: 'emaar' },
                { name: 'هاسيندا باي', dev: 'palmhills' },
                { name: 'هاسيندا وايت', dev: 'palmhills' },
                { name: 'هاسيندا ويست', dev: 'palmhills' },
                { name: 'ماونتن فيو رأس الحكمة', dev: 'mountainview' },
                { name: 'لفلز (LVLS)', dev: 'mountainview' },
                { name: 'بلاج (Plage)', dev: 'mountainview' },
                { name: 'جون (June)', dev: 'sodic' },
                { name: 'سيزار (Caesar)', dev: 'sodic' },
                { name: 'سيلفر ساندز', dev: 'ora' },
                { name: 'أمواج', dev: 'alahlysabbour' },
                { name: 'جايا (Gaia)', dev: 'alahlysabbour' },
                { name: 'ألماظة باي', dev: 'sodic' },
                { name: 'فوكا باي', dev: 'tatweermisr' }
            ],
            'sokhna': [
                { name: 'إل مونتي جلالة', dev: 'tatweermisr' },
                { name: 'أزهى (Azha)', dev: 'sodic' },
                { name: 'تلال السخنة', dev: 'palmhills' },
                { name: 'ماونتن فيو السخنة', dev: 'mountainview' },
                { name: 'بياصيرا', dev: 'alahlysabbour' },
                { name: 'مكادي هايتس', dev: 'orascom' },
                { name: 'لا فيستا', dev: 'sodic' },
                { name: 'بلو بلو', dev: 'sodic' },
                { name: 'كارنيليا', dev: 'sodic' },
                { name: 'فيا (Phia)', dev: 'tatweermisr' },
                { name: 'كاي (Kai)', dev: 'misritalia' },
                { name: 'أروما', dev: 'sodic' },
                { name: 'ليتل فينيس', dev: 'sodic' },
                { name: 'جبال (Jebal)', dev: 'palmhills' },
                { name: 'ماجادا', dev: 'emaar' }
            ],
            'new_capital': [
                { name: 'نايل بيزنس سيتي', dev: 'nile' },
                { name: 'تايكون تاور', dev: 'nile' },
                { name: '31 نورث تاور', dev: 'nile' },
                { name: 'سيليا (Celia)', dev: 'tmg' },
                { name: 'البوسكو', dev: 'misritalia' },
                { name: 'فينشي (Vinci)', dev: 'misritalia' },
                { name: 'فرونت جيت', dev: 'ccr' },
                { name: 'المقصد', dev: 'cityedge' },
                { name: 'سيناريو', dev: 'alahlysabbour' },
                { name: 'ميدتاون', dev: 'sodic' },
                { name: 'أويا (Oia)', dev: 'sodic' },
                { name: 'كاسيل لاند مارك', dev: 'sodic' },
                { name: 'بوردووك', dev: 'sodic' },
                { name: 'ريفان', dev: 'sodic' },
                { name: 'دي جويا', dev: 'sodic' }
            ]
        };

        function showDestinationProjects(destKey, destName) {
            document.getElementById('destinations-view').classList.add('hidden');
            document.getElementById('projects-view').classList.remove('hidden');
            document.getElementById('destination-title').innerText = destName;
            
            // Auto update interest select in form
            const select = document.getElementById('interest');
            if(select && select.querySelector(\`option[value="\${destKey}"]\`)) {
                select.value = destKey;
            }

            const grid = document.getElementById('projects-grid');
            grid.innerHTML = ''; // Clear previous

            const projects = projectsData[destKey] || [];
            
            projects.forEach(project => {
                const logoUrl = getLogo(project.dev);
                const devName = getDevName(project.dev);
                
                const card = document.createElement('div');
                card.className = 'bg-white rounded-2xl overflow-hidden shadow border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer';
                card.onclick = () => document.getElementById('contact').scrollIntoView({behavior: 'smooth'});
                
                card.innerHTML = \`
                    <div class="h-40 p-6 flex items-center justify-center bg-gray-50 group-hover:bg-gray-100 transition-colors">
                        <img src="\${logoUrl}" alt="\${devName}" class="max-w-full max-h-full object-contain filter drop-shadow-sm" onerror="this.src='\${defaultLogo}'">
                    </div>
                    <div class="p-5 flex-1 border-t border-gray-100">
                        <h3 class="text-xl font-bold text-navy mb-1 group-hover:text-gold transition-colors">\${project.name}</h3>
                        <p class="text-gray-500 text-sm font-semibold">\${devName}</p>
                    </div>
                \`;
                grid.appendChild(card);
            });
            
            // Scroll to top of projects view
            document.getElementById('projects').scrollIntoView({behavior: 'smooth'});
        }

        function backToDestinations() {
            document.getElementById('projects-view').classList.add('hidden');
            document.getElementById('destinations-view').classList.remove('hidden');
            document.getElementById('projects').scrollIntoView({behavior: 'smooth'});
        }
    </script>
</body>`;

html = html.replace(/<\/body>/, scriptLogic);

// Write back
fs.writeFileSync(filePath, html);
console.log('Successfully injected SPA logic.');
