const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// Inject the developers-view container
html = html.replace(
    /            <\/div> <!-- End of destinations-view -->\n\n            <!-- Dedicated Projects View -->/g,
    `            </div> <!-- End of destinations-view -->

            <!-- Developers View -->
            <div id="developers-view" class="hidden">
                <div class="mb-10 flex flex-col md:flex-row items-center justify-between border-b border-gray-200 pb-6 gap-4">
                    <button onclick="backToDestinations()" class="flex items-center gap-2 text-navy hover:text-gold font-bold transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                        العودة للوجهات
                    </button>
                    <h2 class="text-3xl md:text-4xl font-bold text-navy text-center flex-1">أهم المطورين في <span id="developers-dest-title" class="text-gold"></span></h2>
                    <div class="w-24 md:w-auto"></div>
                </div>
                
                <div id="developers-grid" class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <!-- Developers will be injected here -->
                </div>
            </div>

            <!-- Dedicated Projects View -->`
);

// Update projects-view "Back" button to go back to developers view
html = html.replace(
    /<button onclick="backToDestinations\(\)" class="flex items-center gap-2 text-navy hover:text-gold font-bold transition-colors">\s*<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"><\/path><\/svg>\s*العودة للوجهات\s*<\/button>/g,
    `<button onclick="backToDevelopers()" class="flex items-center gap-2 text-navy hover:text-gold font-bold transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                        العودة للمطورين
                    </button>`
);


// Rewrite the script block entirely
const scriptBlockRegex = /<script>[\s\S]*?<\/script>\n<\/body>/;

const newScriptBlock = `
    <script>
        const devLogos = {
            'mountainview': 'https://logo.clearbit.com/mountainviewegypt.com',
            'palmhills': 'https://logo.clearbit.com/palmhillsdevelopments.com',
            'sodic': 'https://logo.clearbit.com/sodic.com',
            'emaar': 'https://logo.clearbit.com/emaar.com',
            'ora': 'https://logo.clearbit.com/oradevelopers.com',
            'madinetmasr': 'https://logo.clearbit.com/madinetmasr.com',
            'majidalfuttaim': 'https://logo.clearbit.com/majidalfuttaim.com',
            'alahlysabbour': 'https://logo.clearbit.com/alahlysabbour.com',
            'nile': 'https://logo.clearbit.com/niledevelopments.com',
            'orascom': 'https://logo.clearbit.com/orascom.com',
            'ccr': 'https://logo.clearbit.com/ccr-developments.com',
            'misritalia': 'https://logo.clearbit.com/misritaliaproperties.com',
            'tatweermisr': 'https://logo.clearbit.com/tatweermisr.com',
            'hydepark': 'https://logo.clearbit.com/hydeparkdevelopments.com',
            'cityedge': 'https://logo.clearbit.com/cityedgedevelopments.com',
            'lmd': 'https://logo.clearbit.com/lmd.com.eg',
            'tmg': 'https://logo.clearbit.com/tmg.com.eg'
        };

        const defaultLogo = 'https://ui-avatars.com/api/?name=Real+Estate&background=0A192F&color=D4AF37';
        const getLogo = (devId) => devLogos[devId] || defaultLogo;

        const developersProfiles = {
            'mountainview': { name: 'ماونتن فيو', desc: 'تتميز بمشاريعها ذات التصميم المعماري الفريد والمساحات الخضراء الشاسعة، تقدم تجربة سكنية مبتكرة.', payment: 'مقدم يبدأ من 5% وأقساط تصل إلى 8 سنوات.' },
            'palmhills': { name: 'بالم هيلز', desc: 'من كبرى شركات التطوير في مصر، تبني مجتمعات متكاملة ومستدامة بأعلى معايير الجودة.', payment: 'مقدم 5% وتسهيلات في السداد تصل إلى 10 سنوات.' },
            'sodic': { name: 'سوديك', desc: 'معروفة بمشاريعها الراقية والمبتكرة التي تلبي احتياجات العملاء الباحثين عن التميز والرقي.', payment: 'مقدم 5% وأقساط متساوية حتى 8 سنوات.' },
            'emaar': { name: 'إعمار مصر', desc: 'رائدة التطوير العقاري عالمياً، تقدم أسلوب حياة فاخر ومجتمعات نابضة بالحياة في مصر.', payment: 'مقدم 5% وخطة دفع ميسرة تصل إلى 8 سنوات.' },
            'ora': { name: 'أورا ديفيلوبرز', desc: 'بقيادة المهندس نجيب ساويرس، تقدم مشاريع استثنائية تجمع بين الفخامة والطبيعة الخلابة.', payment: 'مقدم 5% وأقساط مرنة تصل إلى 8 سنوات.' },
            'madinetmasr': { name: 'مدينة مصر', desc: 'صاحبة التاريخ الطويل في تطوير القاهرة وتحديثها بمجتمعات سكنية عصرية ومتكاملة.', payment: 'مقدم 5% وفترات سداد مريحة حتى 10 سنوات.' },
            'majidalfuttaim': { name: 'ماجد الفطيم', desc: 'مطور عالمي يقدم تجارب حياة متكاملة تجمع بين السكن الراقي والترفيه والتسوق.', payment: 'مقدم 5% وأقساط على مدار 8 سنوات.' },
            'alahlysabbour': { name: 'الأهلي صبور', desc: 'تاريخ طويل من الثقة وبناء مشاريع أيقونية ترضي كافة أذواق العائلة المصرية.', payment: 'مقدم يبدأ من 5% وأقساط حتى 10 سنوات.' },
            'nile': { name: 'النيل للتطوير', desc: 'تتميز ببناء ناطحات السحاب والمشاريع التجارية والإدارية الضخمة في العاصمة الإدارية.', payment: 'مقدم 10% وأقساط ممتدة حتى 10 سنوات.' },
            'orascom': { name: 'أوراسكوم', desc: 'تطور مدناً سياحية وسكنية متكاملة بلمسة عالمية مثل الجونة وأو ويست ومكادي هايتس.', payment: 'مقدم 5% وتقسيط يصل إلى 9 سنوات.' },
            'tatweermisr': { name: 'تطوير مصر', desc: 'تدمج الابتكار والتصميم المعماري في وجهات ساحلية وسكنية فريدة من نوعها.', payment: 'مقدم يبدأ من 5% وأقساط حتى 10 سنوات.' },
            'misritalia': { name: 'مصر إيطاليا', desc: 'تقدم تصميمات مستوحاة من الطراز الإيطالي مع التركيز على الطبيعة والابتكار.', payment: 'مقدم 5% وأقساط تصل إلى 9 سنوات.' },
            'hydepark': { name: 'هايد بارك', desc: 'معروفة بمساحاتها الخضراء الواسعة ومشاريعها المتميزة في القاهرة الجديدة وأكتوبر.', payment: 'مقدم 5% وأقساط تصل إلى 8 سنوات.' },
            'cityedge': { name: 'سيتي إيدج', desc: 'شركة وطنية تقدم مشاريع قومية وأبراج سكنية فاخرة في المدن الجديدة.', payment: 'مقدم 5% وأقساط تصل إلى 10 سنوات.' },
            'tmg': { name: 'مجموعة طلعت مصطفى', desc: 'أكبر مطور عقاري في مصر والشرق الأوسط، مطور مدن متكاملة مثل مدينتي والرحاب وسيليا.', payment: 'مقدمات بسيطة وفترات سداد تمتد حتى 14 سنة.' },
            'lmd': { name: 'LMD', desc: 'تتخصص في تطوير مشاريع سكنية وتجارية فاخرة بمواقع استراتيجية وتصاميم عصرية.', payment: 'مقدم 10% وأقساط حتى 8 سنوات.' }
        };

        const destinationsData = {
            'new_cairo': [
                { dev: 'emaar', projects: [{name: 'ميفيدا (Mivida)', details: 'مجتمع صديق للبيئة مستوحى من الطراز المعماري في كاليفورنيا.'}] },
                { dev: 'sodic', projects: [{name: 'فيليت (Villette)', details: 'فيلات فاخرة وتوين هاوس مع نادي رياضي ضخم.'}, {name: 'إيستاون (Eastown)', details: 'شقق سكنية راقية بجوار الجامعة الأمريكية.'}] },
                { dev: 'palmhills', projects: [{name: 'بالم هيلز نيو كايرو', details: 'كمبوند متكامل يضم شقق وفيلات بمساحات خضراء شاسعة.'}] },
                { dev: 'mountainview', projects: [{name: 'ماونتن فيو آي سيتي', details: 'مدينة مبتكرة تفصل حركة السيارات عن المشاة تماماً.'}, {name: 'ماونتن فيو هايد بارك', details: 'يجمع بين التصميم الأمريكي والبيئة الطبيعية.'}] },
                { dev: 'madinetmasr', projects: [{name: 'تاج سيتي', details: 'موقع استراتيجي على الطريق الدائري مباشرة.'}] },
                { dev: 'majidalfuttaim', projects: [{name: 'كايرو فيستيفال سيتي', details: 'مجتمع متكامل يضم السكن، والأعمال، والتسوق.'}] },
                { dev: 'alahlysabbour', projects: [{name: 'لاميرادا', details: 'تصميم عصري وحديث يلبي احتياجات العائلة.'}, {name: 'آريا', details: 'مشروع متميز في قلب مدينة المستقبل.'}] },
                { dev: 'ora', projects: [{name: 'زيد إيست', details: 'يضم نادي رياضي ضخم وحديقة مركزية ومساحات خضراء هائلة.'}] },
                { dev: 'hydepark', projects: [{name: 'هايد بارك', details: 'أكبر حديقة مركزية في القاهرة الجديدة ومجموعة متنوعة من الوحدات.'}] },
                { dev: 'lmd', projects: [{name: 'ستيت (Stei8ht)', details: 'كمبوند مخصص للفيلات فقط بتصميم راقٍ جداً.'}] }
            ],
            'zayed': [
                { dev: 'ora', projects: [{name: 'زيد ويست', details: 'أبراج سكنية فاخرة تطل على زيد بارك بالشيخ زايد.'}, {name: 'سيلفا (Silva)', details: 'مشروع فيلات راقي بتصميم عصري.'}] },
                { dev: 'emaar', projects: [{name: 'كايرو جيت', details: 'يقع مباشرة على طريق مصر إسكندرية الصحراوي بلمسة أوروبية.'}, {name: 'بيل ڤي (Belle Vie)', details: 'كمبوند سياحي سكني يجمع بين الحياة العصرية والطبيعة.'}] },
                { dev: 'sodic', projects: [{name: 'ذا إستيتس', details: 'فيلات فاخرة جداً في زايد الجديدة.'}, {name: 'بيفرلي هيلز', details: 'أول مجتمع سكني متكامل وأيقونة مدينة الشيخ زايد.'}, {name: 'فاي (VYE)', details: 'مشروع ذكي يستهدف الشباب والعائلات العصرية.'}] },
                { dev: 'palmhills', projects: [{name: 'بالم باركس', details: 'مصمم خصيصاً لتوفير حياة مجتمعية دافئة.'}, {name: 'كازا', details: 'شقق سكنية متكاملة التشطيب بأعلى معايير الجودة.'}] },
                { dev: 'tatweermisr', projects: [{name: 'ريفرز (Rivers)', details: 'مشروع يتميز بالمجاري المائية والمساحات الخضراء في زايد الجديدة.'}] },
                { dev: 'mountainview', projects: [{name: 'ماونتن فيو زايد', details: 'يجمع بين الخصوصية والتصميم الأمريكي المميز.'}] },
                { dev: 'nile', projects: [{name: 'نايا ويست', details: 'مشروع مبتكر في موقع استراتيجي بزايد.'}] }
            ],
            'october': [
                { dev: 'palmhills', projects: [{name: 'باديا (Badya)', details: 'المدينة الإبداعية وأكبر مشروع ذكي متكامل في 6 أكتوبر.'}, {name: 'بالم هيلز أكتوبر', details: 'كمبوند الفيلات المرموق والأشهر في غرب القاهرة.'}, {name: 'ذا كراون', details: 'مستوى جديد من الفخامة والخصوصية العالية.'}] },
                { dev: 'mountainview', projects: [{name: 'ماونتن فيو تشيل أوت', details: 'يوفر حياة هادئة بعيدة عن ضوضاء المدينة.'}, {name: 'آي سيتي أكتوبر', details: 'مشروع مبتكر بقلب 6 أكتوبر.'}] },
                { dev: 'orascom', projects: [{name: 'أو ويست (O West)', details: 'مدينة متكاملة توفر نفس جودة وتجربة مدينة الجونة في القاهرة.'}] },
                { dev: 'alahlysabbour', projects: [{name: 'كيفا (Keeva)', details: 'مشروع يجمع بين الطراز الريفي الحديث وتوفير الراحة النفسية.'}] },
                { dev: 'sodic', projects: [{name: 'أكتوبر بلازا', details: 'يوفر شقق سكنية بتصميم مميز ومرافق متكاملة.'}] },
                { dev: 'hydepark', projects: [{name: 'تاوني (Tawny)', details: 'مشروع فيلات حصري يوفر هدوء تام في موقع مميز.'}] },
                { dev: 'tatweermisr', projects: [{name: 'صن كابيتال', details: 'عاصمة الشمس، يتميز بإطلالة مباشرة على الأهرامات.'}] },
                { dev: 'madinetmasr', projects: [{name: 'أشجار سيتي', details: 'مشروع يتميز بمساحاته الخضراء الهائلة.'}] }
            ],
            'north_coast': [
                { dev: 'emaar', projects: [{name: 'مراسي (Marassi)', details: 'أكبر مارينا دولية وشواطئ فيروزية خلابة بتصميمات عالمية.'}, {name: 'سول (Soul)', details: 'وجهة فائقة الفخامة تقدم شواطئ ممتدة ومناظر طبيعية ساحرة.'}] },
                { dev: 'palmhills', projects: [{name: 'هاسيندا باي', details: 'الوجهة المفضلة للشباب بفضل الخدمات الترفيهية الاستثنائية.'}, {name: 'هاسيندا وايت', details: 'ملاذ فاخر لعشاق البحر والهدوء.'}, {name: 'هاسيندا ويست', details: 'تصميم بوهيمي عصري على شواطئ رأس الحكمة.'}] },
                { dev: 'mountainview', projects: [{name: 'ماونتن فيو رأس الحكمة', details: 'منتجع مصمم على الطراز اليوناني بمياه زرقاء صافية.'}, {name: 'لفلز (LVLS)', details: 'إطلالات بحرية بانورامية لجميع الوحدات بفضل التدرج الطبيعي.'}] },
                { dev: 'sodic', projects: [{name: 'جون (June)', details: 'مستوحى من شواطئ ميامي ويقدم تصاميم معمارية فريدة.'}, {name: 'سيزار', details: 'يتميز بالخصوصية والشاطئ الرملي الممتاز.'}] },
                { dev: 'ora', projects: [{name: 'سيلفر ساندز', details: 'أحد أرقى وأغلى منتجعات الساحل بفضل جودة الشاطئ والخدمات.'}] },
                { dev: 'alahlysabbour', projects: [{name: 'جايا (Gaia)', details: 'منتجع هادئ يركز على الراحة النفسية والأنشطة الترفيهية.'}, {name: 'أمواج', details: 'من أشهر قرى الساحل الشمالي النابضة بالحياة.'}] },
                { dev: 'tatweermisr', projects: [{name: 'فوكا باي', details: 'يقدم بحيرات صناعية ضخمة وشواطئ رائعة.'}] }
            ],
            'sokhna': [
                { dev: 'tatweermisr', projects: [{name: 'إل مونتي جلالة', details: 'مشروع مبني على جبال الجلالة يقدم أول كريستال لاجون جبلي في العالم.'}, {name: 'فيا (Phia)', details: 'قرية على الطراز اليوناني بمناظر خلابة.'}] },
                { dev: 'sodic', projects: [{name: 'أزهى (Azha)', details: 'قرية متكاملة تقدم فنادق 5 نجوم وبحيرات كريستالية شاسعة.'}, {name: 'لا فيستا', details: 'الاسم الأعرق في العين السخنة.'}] },
                { dev: 'palmhills', projects: [{name: 'تلال السخنة', details: 'تصميم متدرج يضمن رؤية البحر من جميع الوحدات.'}] },
                { dev: 'mountainview', projects: [{name: 'ماونتن فيو السخنة', details: 'منتجع يقدم الهدوء والخصوصية بعيداً عن صخب المدينة.'}] },
                { dev: 'orascom', projects: [{name: 'مكادي هايتس', details: 'مدينة متكاملة في البحر الأحمر.'}] },
                { dev: 'alahlysabbour', projects: [{name: 'بياصيرا', details: 'شواطئ رملية نقية وأنشطة مائية متنوعة.'}] },
                { dev: 'misritalia', projects: [{name: 'كاي (Kai)', details: 'منتجع راقٍ يتميز بتصميمات أنيقة وشاطئ مميز.'}] },
                { dev: 'emaar', projects: [{name: 'ماجادا', details: 'مشروع يقدم إطلالات مباشرة على البحر الأحمر.'}] }
            ],
            'new_capital': [
                { dev: 'nile', projects: [{name: 'نايل بيزنس سيتي', details: 'ثاني أعلى ناطحة سحاب في مصر وأكبر مشروع متعدد الاستخدامات.'}, {name: 'تايكون تاور', details: 'أعلى فندق في إفريقيا وأيقونة معمارية.'}, {name: '31 نورث', details: 'أول تاور فيستيفال في العاصمة بفيو مباشر على النهر الأخضر.'}] },
                { dev: 'tmg', projects: [{name: 'سيليا (Celia)', details: 'المشروع السكني الوحيد الموجود بالكامل داخل النهر الأخضر.'}] },
                { dev: 'misritalia', projects: [{name: 'البوسكو', details: 'غابة عمودية ومشروع صديق للبيئة بتصميم إيطالي فريد.'}, {name: 'فينشي (Vinci)', details: 'فيلات وشقق بتصميمات غير تقليدية.'}] },
                { dev: 'cityedge', projects: [{name: 'المقصد', details: 'أول كمبوند جاهز للتسليم في العاصمة الإدارية (فيلات فقط).'}] },
                { dev: 'sodic', projects: [{name: 'ميدتاون', details: 'مجموعة من أفضل المشاريع السكنية والتجارية في قلب العاصمة.'}] },
                { dev: 'alahlysabbour', projects: [{name: 'سيناريو', details: 'يقدم سيناريوهات مختلفة للحياة اليومية بتصميم مميز.'}] },
                { dev: 'ccr', projects: [{name: 'فرونت جيت', details: 'مشروع تجاري وإداري بموقع استراتيجي.'}] }
            ]
        };

        let currentDestKey = '';
        let currentDestName = '';

        function showDestinationProjects(destKey, destName) {
            currentDestKey = destKey;
            currentDestName = destName;

            document.getElementById('destinations-view').classList.add('hidden');
            document.getElementById('developers-view').classList.remove('hidden');
            document.getElementById('projects-view').classList.add('hidden');
            
            document.getElementById('developers-dest-title').innerText = destName;
            
            // Auto update interest select in form
            const select = document.getElementById('interest');
            if(select && select.querySelector(\`option[value="\${destKey}"]\`)) {
                select.value = destKey;
            }

            const grid = document.getElementById('developers-grid');
            grid.innerHTML = ''; // Clear previous

            const destDevs = destinationsData[destKey] || [];
            
            destDevs.forEach(devEntry => {
                const devKey = devEntry.dev;
                const profile = developersProfiles[devKey] || {name: devKey, desc: '', payment: ''};
                const logoUrl = getLogo(devKey);
                
                const card = document.createElement('div');
                card.className = 'bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col group cursor-pointer';
                card.onclick = () => showDeveloperProjects(devKey, profile.name, devEntry.projects);
                
                card.innerHTML = \`
                    <div class="flex flex-col sm:flex-row h-full">
                        <div class="sm:w-2/5 p-6 flex items-center justify-center bg-gray-50 border-b sm:border-b-0 sm:border-l border-gray-100 group-hover:bg-gray-100 transition-colors">
                            <img src="\${logoUrl}" alt="\${profile.name}" class="w-32 h-32 object-contain filter drop-shadow-sm" onerror="this.src='\${defaultLogo}'">
                        </div>
                        <div class="sm:w-3/5 p-6 flex flex-col justify-center">
                            <h3 class="text-2xl font-bold text-navy mb-3 group-hover:text-gold transition-colors">\${profile.name}</h3>
                            <p class="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">\${profile.desc}</p>
                            <div class="mt-auto inline-block bg-gold/10 text-gold px-4 py-2 rounded-lg text-sm font-bold border border-gold/20 flex items-center gap-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                \${profile.payment}
                            </div>
                        </div>
                    </div>
                \`;
                grid.appendChild(card);
            });
            
            document.getElementById('projects').scrollIntoView({behavior: 'smooth'});
        }

        function showDeveloperProjects(devKey, devName, projectsArray) {
            document.getElementById('developers-view').classList.add('hidden');
            document.getElementById('projects-view').classList.remove('hidden');
            document.getElementById('destination-title').innerText = \`\${devName} في \${currentDestName}\`;

            const grid = document.getElementById('projects-grid');
            grid.innerHTML = ''; // Clear previous

            const logoUrl = getLogo(devKey);

            projectsArray.forEach(project => {
                const card = document.createElement('div');
                card.className = 'bg-white rounded-2xl overflow-hidden shadow border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer';
                card.onclick = () => document.getElementById('contact').scrollIntoView({behavior: 'smooth'});
                
                card.innerHTML = \`
                    <div class="h-48 p-6 flex items-center justify-center bg-gray-50 group-hover:bg-gray-100 transition-colors relative">
                        <img src="\${logoUrl}" alt="\${devName}" class="max-w-full max-h-full object-contain filter drop-shadow-sm opacity-50 group-hover:opacity-100 transition-opacity" onerror="this.src='\${defaultLogo}'">
                        <div class="absolute inset-0 bg-navy/80 hidden group-hover:flex items-center justify-center transition-all">
                            <span class="text-gold font-bold text-lg">طلب تفاصيل المشروع</span>
                        </div>
                    </div>
                    <div class="p-6 flex-1 border-t border-gray-100 flex flex-col">
                        <h3 class="text-xl font-bold text-navy mb-3 group-hover:text-gold transition-colors">\${project.name}</h3>
                        <p class="text-gray-500 text-sm leading-relaxed mb-4 flex-1">\${project.details}</p>
                        <button class="text-navy font-bold text-sm flex items-center gap-1 group-hover:text-gold transition-colors mt-auto">
                            التفاصيل والأسعار
                            <svg class="w-4 h-4 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                        </button>
                    </div>
                \`;
                grid.appendChild(card);
            });
            
            document.getElementById('projects').scrollIntoView({behavior: 'smooth'});
        }

        function backToDestinations() {
            document.getElementById('developers-view').classList.add('hidden');
            document.getElementById('destinations-view').classList.remove('hidden');
            document.getElementById('projects').scrollIntoView({behavior: 'smooth'});
        }

        function backToDevelopers() {
            document.getElementById('projects-view').classList.add('hidden');
            document.getElementById('developers-view').classList.remove('hidden');
            document.getElementById('projects').scrollIntoView({behavior: 'smooth'});
        }
    </script>
</body>
`;

html = html.replace(scriptBlockRegex, newScriptBlock);

fs.writeFileSync(filePath, html);
console.log('Successfully injected developers layer logic.');
