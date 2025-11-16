import { RegistrationPage } from "../pages/RegistrationPage/RegistrationPage";
import { UserNavigationSection } from "../commonPageElements/UserNavigationSection/UserNavigationSection";
import { Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { HomePage } from "../pages/HomePage/HomePage";
import { ForgotPasswordPage } from "../pages/ForgotPasswordPage/ForgotPasswordPage";
import { CatalogPage } from "../pages/CatalogPage/CatalogPage";
import { MyFavorites } from "../pages/MyFavoritesPage/MyFavoritesPage";
import { SidebarFilterBy } from "../commonPageElements/SidebarFilter/SidebarFilterBy";
import { ItemPage } from "../pages/ItemPage/ItemPage";
import { MiniCart } from "../commonPageElements/MiniCart/MiniCart";

export class AppContext {
  public loginPage: LoginPage;
  public homePage: HomePage;
  public forgotPasswordPage: ForgotPasswordPage;
  public userNavigationSection: UserNavigationSection;
  public registrationPage: RegistrationPage;
  public pageWithItems: CatalogPage;
  public myFavorites: MyFavorites;
  public sidebarFilter: SidebarFilterBy;
  public itemPage: ItemPage;
  public miniCart: MiniCart;

  constructor(page: Page) {
    this.loginPage = new LoginPage(page);
    this.homePage = new HomePage(page);
    this.forgotPasswordPage = new ForgotPasswordPage(page);
    this.userNavigationSection = new UserNavigationSection(page);
    this.registrationPage = new RegistrationPage(page);
    this.pageWithItems = new CatalogPage(page);
    this.myFavorites = new MyFavorites(page);
    this.sidebarFilter = new SidebarFilterBy(page);
    this.itemPage = new ItemPage(page);
    this.miniCart = new MiniCart(page);
  }
}
