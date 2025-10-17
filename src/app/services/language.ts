import { Injectable, signal, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Language {
  private platformId = inject(PLATFORM_ID);

  private allLanguages = [
    "English",
    "Russian - Русский",
    "Spanish - Español",
    "Italian - Italiano",
    "German - Deutsch",
    "Arabic - عربي",
    "French - Français",
    "Persian - فارسی",
    "Turkish - Türkçe",
    "Hungarian - magyar",
    "Polish - Polski",
    "Portuguese - Português",
    "Czech - čeština",
    "Slovak - Slovák",
    "Indonesian",
    "Vietnamese - Tiếng Việt",
    "Uzbek - o'zbek"
  ];

  private rtlLanguages = ['Arabic - عربي', 'Persian - فارسی'];

  private translations: Record<string, Record<string, string>> = {
    "English": {
      "Email": "Email",
      "Password": "Password",
      "Log In": "Log In",
      "Welcome": "Welcome",
      "Country": "Country",
      "Mobile": "Mobile",
      "to Mission Town": "to Mission Town",
      "Remember me": "Remember me",
      "Forgot password": "Forgot password?",
      "Don't have an account": "Don't have an account?",
      "Sign Up": "Sign Up",
      "Password is required": "Password is required",
      "Password must be at least 6 characters": "Password must be at least 6 characters",
      "Email is required": "Email is required",
      "Create your account": "Create your account",
      "Full Name": "Full Name",
      "Login Password": "Login Password",
      "E-PIN": "E-PIN",
      "Confirm E-PIN": "Confirm E-PIN",
      "in Mission Tower-B": "in Mission Tower-B",
      "I agree to all": "I agree to all",
      "Terms & Conditions": "Terms & Conditions",
      "Create Account": "Create Account",
      "Already have an account?": "Already have an account?"
    },

    "Russian - Русский": {
      "Email": "Электронная почта",
      "Password": "Пароль",
      "Log In": "Войти",
      "Welcome": "Добро пожаловать",
      "Country": "Страна",
      "Mobile": "Мобильный",
      "to Mission Town": "в Mission Town",
      "Remember me": "Запомнить меня",
      "Forgot password": "Забыли пароль?",
      "Don't have an account": "Нет учетной записи?",
      "Sign Up": "Зарегистрироваться",
      "Password is required": "Требуется пароль",
      "Password must be at least 6 characters": "Пароль должен содержать не менее 6 символов",
      "Email is required": "Требуется электронная почта",
      "Create your account": "Создайте учетную запись",
      "Full Name": "Полное имя",
      "Login Password": "Пароль для входа",
      "E-PIN": "E-PIN",
      "Confirm E-PIN": "Подтвердите E-PIN",
      "in Mission Tower-B": "в Mission Tower-B",
      "I agree to all": "Я согласен со всеми",
      "Terms & Conditions": "Условия и положения",
      "Create Account": "Создать учетную запись",
      "Already have an account?": "Уже есть учетная запись?"
    },

    "Spanish - Español": {
      "Email": "Correo electrónico",
      "Password": "Contraseña",
      "Log In": "Iniciar sesión",
      "Welcome": "Bienvenido",
      "Country": "País",
      "Mobile": "Móvil",
      "to Mission Town": "a Mission Town",
      "Remember me": "Recuérdame",
      "Forgot password": "¿Olvidaste tu contraseña?",
      "Don't have an account": "¿No tienes una cuenta?",
      "Sign Up": "Regístrate",
      "Password is required": "Se requiere contraseña",
      "Password must be at least 6 characters": "La contraseña debe tener al menos 6 caracteres",
      "Email is required": "Se requiere correo electrónico",
      "Create your account": "Crea tu cuenta",
      "Full Name": "Nombre completo",
      "Login Password": "Contraseña de inicio de sesión",
      "E-PIN": "E-PIN",
      "Confirm E-PIN": "Confirmar E-PIN",
      "in Mission Tower-B": "en Mission Tower-B",
      "I agree to all": "Estoy de acuerdo con todos",
      "Terms & Conditions": "Términos y condiciones",
      "Create Account": "Crear cuenta",
      "Already have an account?": "¿Ya tienes una cuenta?"
    },

    "Italian - Italiano": {
      "Email": "Email",
      "Password": "Password",
      "Log In": "Accedi",
      "Welcome": "Benvenuto",
      "Country": "Paese",
      "Mobile": "Cellulare",
      "to Mission Town": "a Mission Town",
      "Remember me": "Ricordami",
      "Forgot password": "Hai dimenticato la password?",
      "Don't have an account": "Non hai un account?",
      "Sign Up": "Iscriviti",
      "Password is required": "La password è obbligatoria",
      "Password must be at least 6 characters": "La password deve contenere almeno 6 caratteri",
      "Email is required": "L'email è obbligatoria",
      "Create your account": "Crea il tuo account",
      "Full Name": "Nome completo",
      "Login Password": "Password di accesso",
      "E-PIN": "E-PIN",
      "Confirm E-PIN": "Conferma E-PIN",
      "in Mission Tower-B": "in Mission Tower-B",
      "I agree to all": "Accetto tutti",
      "Terms & Conditions": "Termini e condizioni",
      "Create Account": "Crea account",
      "Already have an account?": "Hai già un account?"
    },

    "German - Deutsch": {
      "Email": "E-Mail",
      "Password": "Passwort",
      "Log In": "Anmelden",
      "Welcome": "Willkommen",
      "Country": "Land",
      "Mobile": "Handy",
      "to Mission Town": "nach Mission Town",
      "Remember me": "Angemeldet bleiben",
      "Forgot password": "Passwort vergessen?",
      "Don't have an account": "Noch kein Konto?",
      "Sign Up": "Registrieren",
      "Password is required": "Passwort ist erforderlich",
      "Password must be at least 6 characters": "Das Passwort muss mindestens 6 Zeichen lang sein",
      "Email is required": "E-Mail ist erforderlich",
      "Create your account": "Erstelle dein Konto",
      "Full Name": "Vollständiger Name",
      "Login Password": "Login-Passwort",
      "E-PIN": "E-PIN",
      "Confirm E-PIN": "E-PIN bestätigen",
      "in Mission Tower-B": "in Mission Tower-B",
      "I agree to all": "Ich stimme allen zu",
      "Terms & Conditions": "Allgemeine Geschäftsbedingungen",
      "Create Account": "Konto erstellen",
      "Already have an account?": "Hast du bereits ein Konto?"
    },

    "Arabic - عربي": {
      "Email": "البريد الإلكتروني",
      "Password": "كلمة المرور",
      "Log In": "تسجيل الدخول",
      "Welcome": "مرحباً",
      "Country": "البلد",
      "Mobile": "الهاتف المحمول",
      "to Mission Town": "إلى Mission Town",
      "Remember me": "تذكرني",
      "Forgot password": "هل نسيت كلمة المرور؟",
      "Don't have an account": "ليس لديك حساب؟",
      "Sign Up": "اشترك",
      "Password is required": "كلمة المرور مطلوبة",
      "Password must be at least 6 characters": "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل",
      "Email is required": "البريد الإلكتروني مطلوب",
      "Create your account": "أنشئ حسابك",
      "Full Name": "الاسم الكامل",
      "Login Password": "كلمة مرور الدخول",
      "E-PIN": "الرمز السري",
      "Confirm E-PIN": "تأكيد الرمز السري",
      "in Mission Tower-B": "في Mission Tower-B",
      "I agree to all": "أوافق على جميع",
      "Terms & Conditions": "الشروط والأحكام",
      "Create Account": "إنشاء حساب",
      "Already have an account?": "هل لديك حساب بالفعل؟"
    },

    "French - Français": {
      "Email": "E-mail",
      "Password": "Mot de passe",
      "Log In": "Connexion",
      "Welcome": "Bienvenue",
      "Country": "Pays",
      "Mobile": "Mobile",
      "to Mission Town": "à Mission Town",
      "Remember me": "Souviens-toi de moi",
      "Forgot password": "Mot de passe oublié ?",
      "Don't have an account": "Vous n'avez pas de compte ?",
      "Sign Up": "S'inscrire",
      "Password is required": "Mot de passe requis",
      "Password must be at least 6 characters": "Le mot de passe doit comporter au moins 6 caractères",
      "Email is required": "Email requis",
      "Create your account": "Créez votre compte",
      "Full Name": "Nom complet",
      "Login Password": "Mot de passe de connexion",
      "E-PIN": "E-PIN",
      "Confirm E-PIN": "Confirmez E-PIN",
      "in Mission Tower-B": "dans Mission Tower-B",
      "I agree to all": "J'accepte tous",
      "Terms & Conditions": "Termes et conditions",
      "Create Account": "Créer un compte",
      "Already have an account?": "Vous avez déjà un compte ?"
    },

    "Persian - فارسی": {
      "Email": "ایمیل",
      "Password": "رمز عبور",
      "Log In": "ورود",
      "Welcome": "خوش آمدید",
      "Country": "کشور",
      "Mobile": "موبایل",
      "to Mission Town": "به Mission Town",
      "Remember me": "مرا به خاطر بسپار",
      "Forgot password": "رمز عبور را فراموش کرده‌اید؟",
      "Don't have an account": "حساب کاربری ندارید؟",
      "Sign Up": "ثبت‌نام",
      "Password is required": "رمز عبور الزامی است",
      "Password must be at least 6 characters": "رمز عبور باید حداقل ۶ کاراکتر باشد",
      "Email is required": "ایمیل الزامی است",
      "Create your account": "حساب خود را ایجاد کنید",
      "Full Name": "نام کامل",
      "Login Password": "رمز عبور ورود",
      "E-PIN": "کد E-PIN",
      "Confirm E-PIN": "تأیید کد E-PIN",
      "in Mission Tower-B": "در Mission Tower-B",
      "I agree to all": "من با همه موافقم",
      "Terms & Conditions": "شرایط و ضوابط",
      "Create Account": "ایجاد حساب",
      "Already have an account?": "آیا حساب دارید؟"
    },

    "Turkish - Türkçe": {
      "Email": "E-posta",
      "Password": "Şifre",
      "Log In": "Giriş yap",
      "Welcome": "Hoş geldiniz",
      "Country": "Ülke",
      "Mobile": "Mobil",
      "to Mission Town": "Mission Town'a",
      "Remember me": "Beni hatırla",
      "Forgot password": "Şifrenizi mi unuttunuz?",
      "Don't have an account": "Hesabınız yok mu?",
      "Sign Up": "Kayıt ol",
      "Password is required": "Şifre gereklidir",
      "Password must be at least 6 characters": "Şifre en az 6 karakter olmalıdır",
      "Email is required": "E-posta gereklidir",
      "Create your account": "Hesabınızı oluşturun",
      "Full Name": "Tam Ad",
      "Login Password": "Giriş Şifresi",
      "E-PIN": "E-PIN",
      "Confirm E-PIN": "E-PIN'i Onaylayın",
      "in Mission Tower-B": "Mission Tower-B'de",
      "I agree to all": "Tümüne katılıyorum",
      "Terms & Conditions": "Şartlar ve Koşullar",
      "Create Account": "Hesap Oluştur",
      "Already have an account?": "Zaten bir hesabınız var mı?"
    },

    "Hungarian - magyar": {
      "Email": "Email",
      "Password": "Jelszó",
      "Log In": "Bejelentkezés",
      "Welcome": "Üdvözöljük",
      "Country": "Ország",
      "Mobile": "Mobil",
      "to Mission Town": "Mission Townba",
      "Remember me": "Emlékezz rám",
      "Forgot password": "Elfelejtette a jelszavát?",
      "Don't have an account": "Nincs fiókja?",
      "Sign Up": "Regisztrálj",
      "Password is required": "Jelszó szükséges",
      "Password must be at least 6 characters": "A jelszónak legalább 6 karakter hosszúnak kell lennie",
      "Email is required": "Email szükséges",
      "Create your account": "Hozd létre a fiókodat",
      "Full Name": "Teljes név",
      "Login Password": "Bejelentkezési jelszó",
      "E-PIN": "E-PIN",
      "Confirm E-PIN": "E-PIN megerősítése",
      "in Mission Tower-B": "Mission Tower-B-ben",
      "I agree to all": "Elfogadom mindet",
      "Terms & Conditions": "Felhasználási feltételek",
      "Create Account": "Fiók létrehozása",
      "Already have an account?": "Már van fiókod?"
    },

    "Polish - Polski": {
      "Email": "Email",
      "Password": "Hasło",
      "Log In": "Zaloguj się",
      "Welcome": "Witamy",
      "Country": "Kraj",
      "Mobile": "Telefon",
      "to Mission Town": "do Mission Town",
      "Remember me": "Zapamiętaj mnie",
      "Forgot password": "Zapomniałeś hasła?",
      "Don't have an account": "Nie masz konta?",
      "Sign Up": "Zarejestruj się",
      "Password is required": "Hasło jest wymagane",
      "Password must be at least 6 characters": "Hasło musi mieć co najmniej 6 znaków",
      "Email is required": "Email jest wymagany",
      "Create your account": "Utwórz swoje konto",
      "Full Name": "Pełne imię i nazwisko",
      "Login Password": "Hasło logowania",
      "E-PIN": "E-PIN",
      "Confirm E-PIN": "Potwierdź E-PIN",
      "in Mission Tower-B": "w Mission Tower-B",
      "I agree to all": "Zgadzam się na wszystko",
      "Terms & Conditions": "Warunki i zasady",
      "Create Account": "Utwórz konto",
      "Already have an account?": "Masz już konto?"
    },

    "Portuguese - Português": {
      "Email": "E-mail",
      "Password": "Senha",
      "Log In": "Entrar",
      "Welcome": "Bem-vindo",
      "Country": "País",
      "Mobile": "Celular",
      "to Mission Town": "para Mission Town",
      "Remember me": "Lembrar-me",
      "Forgot password": "Esqueceu a senha?",
      "Don't have an account": "Não tem uma conta?",
      "Sign Up": "Inscrever-se",
      "Password is required": "Senha é obrigatória",
      "Password must be at least 6 characters": "A senha deve ter pelo menos 6 caracteres",
      "Email is required": "E-mail é obrigatório",
      "Create your account": "Crie sua conta",
      "Full Name": "Nome completo",
      "Login Password": "Senha de login",
      "E-PIN": "E-PIN",
      "Confirm E-PIN": "Confirmar E-PIN",
      "in Mission Tower-B": "em Mission Tower-B",
      "I agree to all": "Concordo com todos",
      "Terms & Conditions": "Termos e Condições",
      "Create Account": "Criar Conta",
      "Already have an account?": "Já tem uma conta?"
    },

    "Czech - čeština": {
      "Email": "E-mail",
      "Password": "Heslo",
      "Log In": "Přihlásit se",
      "Welcome": "Vítejte",
      "Country": "Země",
      "Mobile": "Mobil",
      "to Mission Town": "do Mission Town",
      "Remember me": "Zapamatovat si mě",
      "Forgot password": "Zapomněli jste heslo?",
      "Don't have an account": "Nemáte účet?",
      "Sign Up": "Zaregistrovat se",
      "Password is required": "Heslo je povinné",
      "Password must be at least 6 characters": "Heslo musí mít alespoň 6 znaků",
      "Email is required": "E-mail je povinný",
      "Create your account": "Vytvořte si účet",
      "Full Name": "Celé jméno",
      "Login Password": "Přihlašovací heslo",
      "E-PIN": "E-PIN",
      "Confirm E-PIN": "Potvrdit E-PIN",
      "in Mission Tower-B": "v Mission Tower-B",
      "I agree to all": "Souhlasím se vším",
      "Terms & Conditions": "Podmínky",
      "Create Account": "Vytvořit účet",
      "Already have an account?": "Už máte účet?"
    },

    "Slovak - Slovák": {
      "Email": "E-mail",
      "Password": "Heslo",
      "Log In": "Prihlásiť sa",
      "Welcome": "Vitajte",
      "Country": "Krajina",
      "Mobile": "Mobil",
      "to Mission Town": "do Mission Town",
      "Remember me": "Zapamätaj si ma",
      "Forgot password": "Zabudli ste heslo?",
      "Don't have an account": "Nemáte účet?",
      "Sign Up": "Zaregistrovať sa",
      "Password is required": "Heslo je povinné",
      "Password must be at least 6 characters": "Heslo musí mať aspoň 6 znakov",
      "Email is required": "E-mail je povinný",
      "Create your account": "Vytvorte si účet",
      "Full Name": "Celé meno",
      "Login Password": "Prihlasovacie heslo",
      "E-PIN": "E-PIN",
      "Confirm E-PIN": "Potvrdiť E-PIN",
      "in Mission Tower-B": "v Mission Tower-B",
      "I agree to all": "Súhlasím so všetkým",
      "Terms & Conditions": "Podmienky",
      "Create Account": "Vytvoriť účet",
      "Already have an account?": "Máte už účet?"
    },

    "Indonesian": {
      "Email": "Email",
      "Password": "Kata sandi",
      "Log In": "Masuk",
      "Welcome": "Selamat datang",
      "Country": "Negara",
      "Mobile": "Ponsel",
      "to Mission Town": "ke Mission Town",
      "Remember me": "Ingat saya",
      "Forgot password": "Lupa kata sandi?",
      "Don't have an account": "Belum punya akun?",
      "Sign Up": "Daftar",
      "Password is required": "Kata sandi wajib diisi",
      "Password must be at least 6 characters": "Kata sandi harus minimal 6 karakter",
      "Email is required": "Email wajib diisi",
      "Create your account": "Buat akun Anda",
      "Full Name": "Nama lengkap",
      "Login Password": "Kata sandi login",
      "E-PIN": "E-PIN",
      "Confirm E-PIN": "Konfirmasi E-PIN",
      "in Mission Tower-B": "di Mission Tower-B",
      "I agree to all": "Saya setuju dengan semua",
      "Terms & Conditions": "Syarat & Ketentuan",
      "Create Account": "Buat Akun",
      "Already have an account?": "Sudah punya akun?"
    },

    "Vietnamese - Tiếng Việt": {
      "Email": "Email",
      "Password": "Mật khẩu",
      "Log In": "Đăng nhập",
      "Welcome": "Chào mừng",
      "Country": "Quốc gia",
      "Mobile": "Di động",
      "to Mission Town": "đến Mission Town",
      "Remember me": "Ghi nhớ tôi",
      "Forgot password": "Quên mật khẩu?",
      "Don't have an account": "Chưa có tài khoản?",
      "Sign Up": "Đăng ký",
      "Password is required": "Mật khẩu là bắt buộc",
      "Password must be at least 6 characters": "Mật khẩu phải có ít nhất 6 ký tự",
      "Email is required": "Email là bắt buộc",
      "Create your account": "Tạo tài khoản của bạn",
      "Full Name": "Họ và tên",
      "Login Password": "Mật khẩu đăng nhập",
      "E-PIN": "E-PIN",
      "Confirm E-PIN": "Xác nhận E-PIN",
      "in Mission Tower-B": "tại Mission Tower-B",
      "I agree to all": "Tôi đồng ý với tất cả",
      "Terms & Conditions": "Điều khoản & Điều kiện",
      "Create Account": "Tạo tài khoản",
      "Already have an account?": "Đã có tài khoản?"
    },

    "Uzbek - o'zbek": {
      "Email": "Elektron pochta",
      "Password": "Parol",
      "Log In": "Kirish",
      "Welcome": "Xush kelibsiz",
      "Country": "Mamlakat",
      "Mobile": "Mobil",
      "to Mission Town": "Mission Townga",
      "Remember me": "Meni eslab qol",
      "Forgot password": "Parolni unutdingizmi?",
      "Don't have an account": "Hisobingiz yo'qmi?",
      "Sign Up": "Ro‘yxatdan o‘tish",
      "Password is required": "Parol kiritish majburiy",
      "Password must be at least 6 characters": "Parol kamida 6 ta belgidan iborat bo‘lishi kerak",
      "Email is required": "Elektron pochta manzili kerak",
      "Create your account": "Hisobingizni yarating",
      "Full Name": "To‘liq ism",
      "Login Password": "Kirish paroli",
      "E-PIN": "E-PIN",
      "Confirm E-PIN": "E-PINni tasdiqlang",
      "in Mission Tower-B": "Mission Tower-Bda",
      "I agree to all": "Hammaga roziman",
      "Terms & Conditions": "Foydalanish shartlari",
      "Create Account": "Hisob yaratish",
      "Already have an account?": "Allaqachon hisobingiz bormi?"
    }

  };

  private currentLang = signal<string>('English');
  private currentDirection = signal<'ltr' | 'rtl'>('ltr');


  constructor() {
    const savedLang = this.safeGetLocalStorage('app_lang');
    const savedDir = this.safeGetLocalStorage('app_dir');

    if (savedLang && this.allLanguages.includes(savedLang)) {
      this.currentLang.set(savedLang);
    }

    if (savedDir === 'rtl' || savedDir === 'ltr') {
      this.currentDirection.set(savedDir as 'rtl' | 'ltr');
    } else {
      this.setDirectionByLanguage(this.currentLang());
    }

    this.applyDirection(this.currentDirection());

  }

  get languages() {
    return this.allLanguages;
  }

  get currentLanguage() {
    return this.currentLang();
  }

  get direction() {
    return this.currentDirection();
  }

  setLanguage(lang: string) {
    if (this.allLanguages.includes(lang)) {
      this.currentLang.set(lang);
      this.safeSetLocalStorage('app_lang', lang);
      this.setDirectionByLanguage(lang);
    }
  }

  private setDirectionByLanguage(lang: string) {
    const isRTL = this.rtlLanguages.includes(lang);
    const dir = isRTL ? 'rtl' : 'ltr';
    this.currentDirection.set(dir);
    this.safeSetLocalStorage('app_dir', dir);
    this.applyDirection(dir);
  }

  private applyDirection(dir: 'ltr' | 'rtl') {
    if (isPlatformBrowser(this.platformId)) {
      const htmlTag = document.documentElement;
      htmlTag.setAttribute('dir', dir);
      htmlTag.setAttribute('lang', this.currentLang());
      document.body.style.direction = dir;
    }
  }

  translate(key: string): string {
    const lang = this.currentLang();
    return this.translations[lang]?.[key] ?? key;
  }

  private safeGetLocalStorage(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      try {
        return localStorage.getItem(key);
      } catch {
        return null;
      }
    }
    return null;
  }

  private safeSetLocalStorage(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem(key, value);
      } catch {
        console.warn('Unable to access localStorage');
      }
    }
  }
}