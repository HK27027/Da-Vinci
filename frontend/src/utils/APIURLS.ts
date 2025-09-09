export class APIURLS {
  private static readonly BASE_URL = 'http://localhost:3000';//normalde .env den alacaktım ama basit bir proje olduğu için almadım

  public static readonly USERS = `${APIURLS.BASE_URL}/users`;
  public static readonly POSTS = `${APIURLS.BASE_URL}/posts`;
  public static readonly USERS_SEARCH = `${APIURLS.USERS}/search`;
  public static readonly POSTS_SEARCH = `${APIURLS.POSTS}/search`;
}
