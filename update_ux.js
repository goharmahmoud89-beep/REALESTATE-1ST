const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. Add Modal HTML before </body>
const modalHtml = `
    <!-- Project Details Modal -->
    <div id="project-modal" class="fixed inset-0 z-[100] hidden flex items-center justify-center p-4 sm:p-6 opacity-0 transition-opacity duration-300">
        <div class="absolute inset-0 bg-navy/80 backdrop-blur-sm" onclick="closeModal()"></div>
        <div class="bg-white rounded-3xl overflow-hidden shadow-2xl relative w-full max-w-4xl transform scale-95 transition-transform duration-300 max-h-[90vh] flex flex-col" id="project-modal-content">
            <button onclick="closeModal()" class="absolute top-4 left-4 z-10 w-10 h-10 bg-black/20 hover:bg-black/40 text-white rounded-full flex items-center justify-center transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            
            <div class="relative h-64 sm:h-80 w-full flex-shrink-0">
                <img id="modal-img" src="" alt="Project Image" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent"></div>
                <div class="absolute bottom-6 right-6 left-6 flex items-end justify-between">
                    <div>
                        <span id="modal-dev-badge" class="bg-gold text-navy text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block"></span>
                        <h2 id="modal-title" class="text-3xl md:text-4xl font-bold text-white mb-2 shadow-sm"></h2>
                        <p id="modal-location" class="text-gray-300 font-medium flex items-center gap-2">
                            <svg class="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            <span></span>
                        </p>
                    </div>
                </div>
            </div>
            
            <div class="p-6 sm:p-8 flex-1 overflow-y-auto">
                <h3 class="text-xl font-bold text-navy mb-4 border-b border-gray-100 pb-2">عن المشروع</h3>
                <p id="modal-desc" class="text-gray-600 leading-relaxed mb-8 text-lg"></p>
                
                <h3 class="text-xl font-bold text-navy mb-4 border-b border-gray-100 pb-2">خطة السداد</h3>
                <div class="bg-gold/10 border border-gold/20 rounded-xl p-4 flex items-center gap-4 mb-8">
                    <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gold shadow-sm shrink-0">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <p id="modal-payment" class="text-navy font-bold text-lg"></p>
                </div>
                
                <button onclick="registerInterest()" class="w-full bg-navy hover:bg-gold text-white hover:text-navy font-bold py-4 rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2 text-lg group">
                    سجل اهتمامك بهذا المشروع
                    <svg class="w-5 h-5 transform group-hover:-translate-x-1 transition-transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                </button>
            </div>
        </div>
    </div>
</body>`;

html = html.replace('</body>', modalHtml);

// 2. Rewrite script block
const scriptRegex = /<script>[\s\S]*?<\/script>\n<!-- Project Details Modal -->/;

const newScript = `<script>
        // Use Google Favicon instead of Clearbit for more reliable logos
        const devLogos = {
            'mountainview': 'mountainviewegypt.com',
            'palmhills': 'palmhillsdevelopments.com',
            'sodic': 'sodic.com',
            'emaar': 'emaarmisr.com',
            'ora': 'oradevelopers.com',
            'madinetmasr': 'madinetmasr.com',
            'majidalfuttaim': 'majidalfuttaim.com',
            'alahlysabbour': 'alahlysabbour.com',
            'nile': 'niledevelopments.com',
            'orascom': 'orascomhm.com',
            'ccr': 'ccr-developments.com',
            'misritalia': 'misritaliaproperties.com',
            'tatweermisr': 'tatweermisr.com',
            'hydepark': 'hydeparkdevelopments.com',
            'cityedge': 'cityedgedevelopments.com',
            'lmd': 'lmd.com.eg',
            'tmg': 'tmg.com.eg'
        };

        const defaultLogo = 'https://ui-avatars.com/api/?name=Real+Estate&background=0A192F&color=D4AF37';
        const getLogo = (devId) => {
            if(devLogos[devId]) return \`https://www.google.com/s2/favicons?domain=\${devLogos[devId]}&sz=128\`;
            return defaultLogo;
        };

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

        // Real estate images from Unsplash to assign randomly to projects for a rich visual experience
        const projectImages = [
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
            'https://images.unsplash.com/photo-1600607687931-cebf0746e48e?w=800&q=80',
            'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
            'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
            'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&q=80',
            'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
            'https://images.unsplash.com/photo-1613490908571-9c6bc76bb549?w=800&q=80',
            'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?w=800&q=80',
            'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?w=800&q=80',
            'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80',
            'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80',
            'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800&q=80',
            'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80'
        ];

        // Hash function to assign a consistent image to a project name
        const getProjectImage = (name) => {
            let hash = 0;
            for (let i = 0; i < name.length; i++) {
                hash = name.charCodeAt(i) + ((hash << 5) - hash);
            }
            const index = Math.abs(hash) % projectImages.length;
            return projectImages[index];
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
                card.onclick = () => showDeveloperProjects(devKey, profile.name, devEntry.projects, profile.payment);
                
                card.innerHTML = \`
                    <div class="flex flex-col sm:flex-row h-full">
                        <div class="sm:w-2/5 p-6 flex items-center justify-center bg-gray-50 border-b sm:border-b-0 sm:border-l border-gray-100 group-hover:bg-gray-100 transition-colors">
                            <img src="\${logoUrl}" alt="\${profile.name}" class="w-24 h-24 sm:w-32 sm:h-32 object-contain filter drop-shadow-sm" onerror="this.src='\${defaultLogo}'">
                        </div>
                        <div class="sm:w-3/5 p-6 flex flex-col justify-center">
                            <h3 class="text-2xl font-bold text-navy mb-3 group-hover:text-gold transition-colors">\${profile.name}</h3>
                            <p class="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">\${profile.desc}</p>
                            <div class="mt-auto inline-block bg-gold/10 text-gold px-4 py-2 rounded-lg text-sm font-bold border border-gold/20 flex items-center gap-2">
                                <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <span class="truncate">\${profile.payment}</span>
                            </div>
                        </div>
                    </div>
                \`;
                grid.appendChild(card);
            });
            
            document.getElementById('projects').scrollIntoView({behavior: 'smooth'});
        }

        function showDeveloperProjects(devKey, devName, projectsArray, devPayment) {
            document.getElementById('developers-view').classList.add('hidden');
            document.getElementById('projects-view').classList.remove('hidden');
            document.getElementById('destination-title').innerText = \`\${devName} في \${currentDestName}\`;

            const grid = document.getElementById('projects-grid');
            grid.innerHTML = ''; // Clear previous

            projectsArray.forEach(project => {
                const projectImg = getProjectImage(project.name);
                
                const card = document.createElement('div');
                card.className = 'bg-white rounded-2xl overflow-hidden shadow border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col group cursor-pointer';
                card.onclick = () => openProjectModal(project.name, projectImg, devName, project.details, devPayment);
                
                card.innerHTML = \`
                    <div class="h-56 relative overflow-hidden">
                        <img src="\${projectImg}" alt="\${project.name}" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700">
                        <div class="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                        <div class="absolute bottom-4 right-4 left-4">
                            <span class="bg-gold text-navy text-xs font-bold px-2 py-1 rounded mb-2 inline-block shadow-sm">\${devName}</span>
                            <h3 class="text-xl font-bold text-white shadow-sm">\${project.name}</h3>
                        </div>
                    </div>
                    <div class="p-5 flex-1 flex flex-col bg-white relative z-10">
                        <p class="text-gray-500 text-sm leading-relaxed mb-4 flex-1 line-clamp-2">\${project.details}</p>
                        <button class="w-full text-center bg-gray-50 hover:bg-navy hover:text-white text-navy font-bold py-3 rounded-lg transition-colors border border-gray-100 flex justify-center items-center gap-2 group-hover:shadow-md">
                            تصفح التفاصيل
                            <svg class="w-4 h-4 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                        </button>
                    </div>
                \`;
                grid.appendChild(card);
            });
            
            document.getElementById('projects').scrollIntoView({behavior: 'smooth'});
        }

        // Modal Logic
        function openProjectModal(title, image, devName, desc, payment) {
            document.getElementById('modal-title').innerText = title;
            document.getElementById('modal-img').src = image;
            document.getElementById('modal-dev-badge').innerText = devName;
            document.getElementById('modal-location').querySelector('span').innerText = currentDestName;
            document.getElementById('modal-desc').innerText = desc;
            document.getElementById('modal-payment').innerText = payment;
            
            const modal = document.getElementById('project-modal');
            modal.classList.remove('hidden');
            // Trigger reflow for animation
            void modal.offsetWidth;
            modal.classList.remove('opacity-0');
            document.getElementById('project-modal-content').classList.remove('scale-95');
            
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }

        function closeModal() {
            const modal = document.getElementById('project-modal');
            modal.classList.add('opacity-0');
            document.getElementById('project-modal-content').classList.add('scale-95');
            
            setTimeout(() => {
                modal.classList.add('hidden');
                document.body.style.overflow = '';
            }, 300);
        }

        function registerInterest() {
            closeModal();
            setTimeout(() => {
                document.getElementById('contact').scrollIntoView({behavior: 'smooth'});
            }, 300);
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
    <!-- Project Details Modal -->`;

html = html.replace(scriptRegex, newScript);
fs.writeFileSync(filePath, html);
